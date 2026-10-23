import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.PIXEL_TEST_URL || "http://127.0.0.1:3100";
const raceDelay = Number(process.env.PIXEL_RACE_DELAY || 700);
// Meta's public configuration includes client-side bot filtering. Exercise the real
// library with a normal Chrome identification, without mocking its code or transport.
const browser = await chromium.launch({ args: ["--disable-blink-features=AutomationControlled"] });
const major = browser.version().split(".")[0];
const evidence = { base, raceDelay, simulatedMeta: false, cases: [] };
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, userAgent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${major}.0.0.0 Safari/537.36` });
    const page = await context.newPage();
    const requests = [], responses = [], failures = [], errors = [];
    const eventName = request => {
      const url = new URL(request.url());
      if (!url.hostname.endsWith("facebook.com") || !/^\/tr\/?$/.test(url.pathname)) {
        return request.redirectedFrom() ? eventName(request.redirectedFrom()) : null;
      }
      return url.searchParams.get("ev") || new URLSearchParams(request.postData() || "").get("ev");
    };
    page.on("request", request => { if (eventName(request) && !request.redirectedFrom()) requests.push(eventName(request)); });
    page.on("response", response => { if (eventName(response.request())) responses.push({ event: eventName(response.request()), status: response.status() }); });
    page.on("requestfailed", request => { if (/facebook/.test(request.url())) failures.push({ host: new URL(request.url()).hostname, error: request.failure()?.errorText }); });
    page.on("pageerror", error => errors.push(error.message));
    await page.addInitScript(delay => {
      window.__observedMetaCalls = [];
      let pixel;
      Object.defineProperty(window, "fbq", { configurable: true, get: () => pixel, set: fn => {
        pixel = new Proxy(fn, { apply(target, self, args) {
          window.__observedMetaCalls.push(Array.from(args));
          return Reflect.apply(target, self, args);
        } });
      } });
      // Reproduce next/script onReady firing before insertion of an inline script.
      const append = Node.prototype.appendChild;
      Node.prototype.appendChild = function(node) {
        if (delay && node instanceof HTMLScriptElement && node.id === "pack-meta-pixel") {
          setTimeout(() => append.call(this, node), delay);
          return node;
        }
        return append.call(this, node);
      };
      // Preserve the actual anchor/click handler, but do not fetch the APK in a test.
      document.addEventListener("click", event => {
        if (event.target instanceof Element && event.target.closest("a.button.primary")) event.preventDefault();
      }, true);
    }, raceDelay);
    const count = (cmd, value) => page.evaluate(([c,v]) => (window.__observedMetaCalls || []).filter(args => args[0] === c && args[1] === v).length, [cmd,value]);
    const expectEvent = async (event, action) => {
      const before = requests.filter(value => value === event).length;
      const reply = page.waitForResponse(response => eventName(response.request()) === event && (response.status() < 300 || response.status() >= 400), { timeout: 25000 });
      const [response] = await Promise.all([reply, action()]);
      assert.equal(response.status(), 200, `${event} real endpoint must acknowledge with HTTP 200`);
      await page.waitForTimeout(400);
      assert.equal(requests.filter(value => value === event).length, before + 1, `Exactly one network request for ${event}`);
    };
    try {
      await page.goto(base, { waitUntil: "networkidle" });
      assert.equal(await page.locator('script[src*="connect.facebook.net"]').count(), 0);
      assert.equal(requests.length, 0);
      await page.getByRole("button", { name: "Recusar", exact: true }).click();
      await page.reload({ waitUntil: "networkidle" });
      assert.equal(await page.locator("#marketing-consent-panel").count(), 0);
      assert.equal(await page.locator('script[src*="connect.facebook.net"]').count(), 0);
      await page.getByRole("button", { name: "Configurações de cookies", exact: true }).click();
      assert.equal(await page.getByRole("status").innerText(), "Cookies de marketing: Recusados");
      const controls = page.locator("#marketing-consent-panel button");
      const left = await controls.nth(0).boundingBox(), right = await controls.nth(1).boundingBox();
      assert.ok(Math.abs(left.y - right.y) < 1, "Consent controls side by side");
      await expectEvent("PageView", () => page.getByRole("button", { name: "Aceitar", exact: true }).click());
      assert.equal(await count("init", "1469158415094350"), 1);
      assert.equal(await count("consent", "grant"), 1);
      assert.equal(await count("track", "PageView"), 1);
      assert.equal(await page.getByRole("button", { name: "Preferências de privacidade", exact: true }).count(), 0);
      await page.getByRole("button", { name: "Configurações de cookies", exact: true }).click();
      assert.equal(await page.getByRole("status").innerText(), "Cookies de marketing: Aceitos");
      await page.getByRole("button", { name: "Aceitar", exact: true }).click();
      assert.equal(await count("consent", "grant"), 1);
      assert.equal(await page.locator("a.button.primary").count(), 4);
      const links = page.locator("a.button.primary:visible");
      for (let index = 0; index < (width === 1440 ? 4 : 1); index++) await expectEvent("DownloadApp", () => links.nth(index).click());
      await page.getByRole("button", { name: "Configurações de cookies", exact: true }).click();
      await page.getByRole("button", { name: "Recusar", exact: true }).click();
      assert.equal(await count("consent", "revoke"), 1);
      const beforeRevokeClick = requests.length;
      await links.first().click();
      await page.waitForTimeout(700);
      assert.equal(requests.length, beforeRevokeClick, "No network events after revocation");
      await page.reload({ waitUntil: "networkidle" });
      assert.equal(await page.locator("#marketing-consent-panel").count(), 0);
      assert.equal(await page.locator('script[src*="connect.facebook.net"]').count(), 0);
      await page.getByRole("button", { name: "Configurações de cookies", exact: true }).click();
      assert.equal(await page.getByRole("status").innerText(), "Cookies de marketing: Recusados");
      await expectEvent("PageView", () => page.getByRole("button", { name: "Aceitar", exact: true }).click());
      await expectEvent("PageView", () => page.reload({ waitUntil: "networkidle" }));
      assert.equal(await count("init", "1469158415094350"), 1);
      assert.equal(await count("consent", "grant"), 1);
      assert.equal(await count("track", "PageView"), 1);
      await expectEvent("PageView", () => page.getByRole("link", { name: "Política de privacidade", exact: true }).click());
      await expectEvent("PageView", () => page.getByRole("navigation", { name: "Informações legais" }).getByRole("link", { name: "Termos de uso", exact: true }).click());
      assert.equal(await count("init", "1469158415094350"), 1);
      assert.equal(await count("consent", "grant"), 1);
      assert.equal(await count("track", "PageView"), 2);
      assert.deepEqual(errors, []);
      assert.deepEqual(failures, []);
      evidence.cases.push({ width, result: "PASS", requests, responses, errors, failures });
      console.log(`PASS real browser ${width}px: delayed bootstrap, no requests before consent, saved preference, footer settings, PageView/DownloadApp HTTP 200, no duplicates, revocation, reload and internal navigation.`);
    } catch (error) {
      evidence.cases.push({ width, result: "FAIL", message: error.message, requests, responses, errors, failures });
      throw error;
    } finally { await context.close(); }
  }
} finally {
  await mkdir(new URL("../test-results/", import.meta.url), { recursive: true });
  await writeFile(new URL("../test-results/meta-pixel-real.json", import.meta.url), JSON.stringify(evidence, null, 2));
  await browser.close();
}
