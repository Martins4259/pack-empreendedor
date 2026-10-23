import { chromium } from "playwright";
import assert from "node:assert/strict";

// Exercise the actual shared component with enabled and disabled URLs in isolation.
const { createRequire } = await import("node:module");
const require = createRequire(import.meta.url);
const ts = require("typescript");
const source = require("node:fs").readFileSync(new URL("../components/DownloadButton.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
let unitClicks = 0;
const sharedModule = { exports: {} };
new Function("require", "module", "exports", compiled)(name => name === "@/lib/meta-pixel" ? { trackDownloadApp: () => unitClicks++ } : require(name), sharedModule, sharedModule.exports);
const disabledTree = sharedModule.exports.DownloadButton({ url: null });
const disabledButton = disabledTree.props.children[0];
assert.equal(disabledButton.type, "button");
assert.equal(disabledButton.props.disabled, true);
assert.equal(disabledButton.props.onClick, undefined);
assert.equal(unitClicks, 0);
const enabledTree = sharedModule.exports.DownloadButton({ url: "https://example.invalid/component-test-only" });
const enabledLink = enabledTree.props.children[0];
assert.equal(enabledLink.props.href, "https://example.invalid/component-test-only");
enabledLink.props.onClick();
assert.equal(unitClicks, 1);
console.log("PASS: actual shared component has no disabled click handler and one enabled event handler; href is preserved.");

const base = process.env.PIXEL_TEST_URL || "http://127.0.0.1:3100";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true });
let loads = 0;
await context.route("https://connect.facebook.net/**", async route => {
  loads++;
  await route.fulfill({ contentType: "application/javascript", body: `window.__metaCalls=(window.fbq.queue||[]).map(x=>Array.from(x));window.fbq.callMethod=function(){window.__metaCalls.push(Array.from(arguments))};` });
});
await context.route("https://www.facebook.com/**", route => route.abort());
// Intercept only the configured APK in the browser: no APK or configuration is changed.
const { readFileSync } = await import("node:fs");
const config = readFileSync(new URL("../config/app-download.ts", import.meta.url), "utf8");
const apkUrl = config.match(/apkUrl:\s*"([^"]+)"/)?.[1];
if (apkUrl) await context.route(apkUrl, route => route.fulfill({ contentType: "application/octet-stream", headers: { "content-disposition": "attachment; filename=local-pixel-check.txt" }, body: "Browser test response only" }));
const page = await context.newPage();
const count = async (command, event) => page.evaluate(([c,e]) => (window.__metaCalls||[]).filter(x=>x[0]===c && x[1]===e).length, [command,event]);
try {
  await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(loads, 0, "No Meta request before consent");
  await page.getByRole("button", { name: "Recusar", exact: true }).click();
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(loads, 0, "Refusal persists");
  await page.getByRole("button", { name: "Preferências de privacidade", exact: true }).click();
  await page.getByRole("button", { name: "Aceitar", exact: true }).click();
  await page.waitForFunction(() => (window.__metaCalls||[]).some(x=>x[0]==="track" && x[1]==="PageView"));
  assert.equal(loads, 1);
  assert.equal(await count("consent", "grant"), 1, "Exactly one initial grant, including Strict Mode/effect/onReady calls");
  assert.equal(await count("init", "1469158415094350"), 1);
  assert.equal(await count("track", "PageView"), 1);
  await page.evaluate(() => { history.pushState(null,"",location.pathname+"#cursos"); });
  await page.waitForTimeout(150);
  assert.equal(await count("track", "PageView"), 1, "Hash links do not create PageViews");
  const anchors = page.locator("a.button.primary");
  const buttons = await anchors.count();
  if (buttons) {
    assert.equal(buttons, 4);
    for (let i=0;i<buttons;i++) {
      await Promise.all([page.waitForEvent("download"), anchors.nth(i).click()]);
      assert.equal(await count("trackCustom", "DownloadApp"), i+1);
    }
  } else assert.equal(await page.locator("button.primary:disabled").count(),4);
  assert.equal(await count("consent", "grant"), 1, "Clicks and hash navigation do not repeat grant");
  const downloads = await count("trackCustom", "DownloadApp");
  await page.getByRole("button", { name: "Preferências de privacidade", exact: true }).click();
  await page.getByRole("button", { name: "Recusar", exact: true }).click();
  if (buttons) await Promise.all([page.waitForEvent("download"), anchors.first().click()]);
  assert.equal(await count("trackCustom", "DownloadApp"), downloads, "Withdrawal stops tracking without blocking APK navigation");
  assert.equal(await count("consent", "revoke"), 1, "One revoke despite setter and subscriber callbacks");
  await page.getByRole("button", { name: "Preferências de privacidade", exact: true }).click();
  await page.getByRole("button", { name: "Recusar", exact: true }).click();
  assert.equal(await count("consent", "revoke"), 1, "Repeated refusal is idempotent");
  await page.getByRole("button", { name: "Preferências de privacidade", exact: true }).click();
  await page.getByRole("button", { name: "Aceitar", exact: true }).click();
  await page.waitForTimeout(150);
  assert.equal(await count("track", "PageView"), 1);
  assert.equal(await count("init", "1469158415094350"), 1);
  assert.equal(await count("consent", "grant"), 2, "Reacceptance applies exactly one new grant");
  await page.getByRole("button", { name: "Preferências de privacidade", exact: true }).click();
  await page.getByRole("button", { name: "Aceitar", exact: true }).click();
  assert.equal(await count("consent", "grant"), 2, "Repeated acceptance is idempotent");
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await count("consent", "grant"), 1, "Saved consent produces one grant on reload");
  assert.equal(await count("init", "1469158415094350"), 1);
  assert.equal(await count("track", "PageView"), 1);
  await page.goto(base+"/politica-de-privacidade", { waitUntil: "networkidle" });
  assert.equal(await count("consent", "grant"), 1);
  assert.equal(await count("track", "PageView"), 1, "Reload has one PageView");
  const currentLoads=loads;
  await page.getByRole("navigation", {name:"Informações legais"}).getByRole("link",{name:"Termos de uso",exact:true}).click();
  await page.waitForFunction(()=>(window.__metaCalls||[]).filter(x=>x[0]==="track"&&x[1]==="PageView").length===2);
  assert.equal(loads,currentLoads,"Internal navigation does not reload Pixel");
  assert.equal(await count("init", "1469158415094350"),1);
  await page.evaluate(()=>history.pushState(null,"",location.pathname+"?pixelcheck=1"));
  await page.waitForFunction(()=>(window.__metaCalls||[]).filter(x=>x[0]==="track"&&x[1]==="PageView").length===3);
  await page.evaluate(()=>history.replaceState(null,"",location.href));
  await page.waitForTimeout(150);
  assert.equal(await count("track", "PageView"),3);
  assert.equal(await count("consent", "grant"), 1, "Internal/query navigation never repeats grant");
  console.log("PASS: one initial grant; idempotent repeated choices; one revoke; one regrant; consent persistence on reload; one init per document; no duplicate PageView/DownloadApp.");
  // Fresh browser with Meta blocked; native download must still work.
  const blocked=await browser.newContext({acceptDownloads:true});
  await blocked.addInitScript(()=>localStorage.setItem("pack-marketing-consent-v1","granted"));
  await blocked.route("https://connect.facebook.net/**",route=>route.abort());
  await blocked.route("https://www.facebook.com/**",route=>route.abort());
  if(apkUrl)await blocked.route(apkUrl,route=>route.fulfill({contentType:"application/octet-stream",headers:{"content-disposition":"attachment; filename=local-pixel-check.txt"},body:"Browser test response only"}));
  const blockedPage=await blocked.newPage();await blockedPage.goto(base,{waitUntil:"networkidle"});
  if(buttons)await Promise.all([blockedPage.waitForEvent("download"),blockedPage.locator("a.button.primary").first().click()]);
  console.log("PASS: blocked Meta script does not block APK navigation.");
  await blocked.close();
} finally { await context.close();await browser.close(); }
