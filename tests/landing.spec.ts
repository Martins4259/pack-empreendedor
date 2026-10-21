import { test, expect } from "@playwright/test";
for (const width of [375, 390, 768, 1024, 1440, 1920]) {
  test(`layout ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Baixe agora seu pack com 10 cursos gratuitos!");
    await expect(page.getByRole("button", { name: "BAIXAR PACK GRATUITO" })).toBeDisabled();
    await expect(page.locator(".course-card")).toHaveCount(9);
    const metrics = await page.evaluate(() => {
      const brand = document.querySelector(".brand")!.getBoundingClientRect();
      const view = document.querySelector(".carousel-viewport")!.getBoundingClientRect();
      const slide = document.querySelector(".carousel-slide")!.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(document.querySelector(".carousel-track")!).gap);
      return { overflow: document.documentElement.scrollWidth - innerWidth, logoCenter: brand.x + brand.width / 2, ratio: (view.width + gap) / (slide.width + gap), visibleNextPercent: (view.width - slide.width - gap) / slide.width * 100, heights: [...document.querySelectorAll(".course-card")].map(el => el.getBoundingClientRect().height), imageRatios: [...document.querySelectorAll(".course-image")].map(el => { const r = el.getBoundingClientRect(); return r.width / r.height; }) };
    });
    expect(metrics.overflow).toBeLessThanOrEqual(1);
    expect(Math.abs(metrics.logoCenter - width / 2)).toBeLessThan(1);
    if (width < 640) { const visible = Math.round(metrics.visibleNextPercent * 10) / 10; expect(visible).toBeGreaterThanOrEqual(20); expect(visible).toBeLessThanOrEqual(25); }
    expect(metrics.ratio).toBeCloseTo(width >= 1440 ? 4 : width >= 1024 ? 3 : width >= 640 ? 2.4 : 1.25, 1);
    expect(Math.max(...metrics.heights) - Math.min(...metrics.heights)).toBeLessThan(1);
    for (const ratio of metrics.imageRatios) expect(ratio).toBeCloseTo(1.6, 1);
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\p{Extended_Pictographic}/u);
    await page.locator("#cursos").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll<HTMLImageElement>("img")].filter(img => img.loading !== "lazy" || img.getBoundingClientRect().left < innerWidth).every(img => img.complete && img.naturalWidth > 0));
    await page.screenshot({ path: `docs/screenshots/${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}
test("menu mobile: foco, Escape, botão e navegação", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir navegação" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Fechar navegação" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("navigation", { name: "Navegação mobile" }).getByRole("link", { name: "Disponibilidade" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Fechar navegação" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await trigger.click();
  await page.getByRole("navigation", { name: "Navegação mobile" }).getByRole("link", { name: "Os cursos" }).click();
  await expect(page).toHaveURL(/#cursos$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("carrossel: movimento, pausa, arraste e loop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.locator("#cursos").scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const transform = () => page.locator(".carousel-track").evaluate(el => getComputedStyle(el).transform);
  await page.waitForTimeout(2000);
  const first = await transform();
  await page.waitForTimeout(500);
  expect(await transform()).not.toBe(first);
  const viewport = await page.locator(".carousel-viewport").boundingBox(); await page.mouse.move(viewport!.x + 100, viewport!.y + 80);
  const hover = await transform();
  await page.waitForTimeout(400);
  expect(await transform()).toBe(hover);
  await page.getByRole("button", { name: "Pausar movimento automático" }).click();
  await page.mouse.move(0, 0);
  const paused = await transform();
  await page.waitForTimeout(400);
  expect(await transform()).toBe(paused);
  const box = await page.locator(".carousel-viewport").boundingBox();
  await page.mouse.move(box!.x + 500, box!.y + 80);
  await page.mouse.down();
  await page.mouse.move(box!.x + 100, box!.y + 80, { steps: 15 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  expect(await transform()).not.toBe(paused);
  const next = page.getByRole("button", { name: "Próximo curso" });
  for (let i = 0; i < 12; i++) { await next.click(); await page.waitForTimeout(80); }
  await page.waitForTimeout(800);
  const cards = await page.locator(".carousel-slide").evaluateAll(els => els.map(el => {const r=el.getBoundingClientRect();return {left:r.left,right:r.right};}));
  expect(cards.filter(r => r.left < 1400 && r.right > 24).length).toBeGreaterThanOrEqual(4);
});
test("movimento reduzido e arraste por toque", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await page.locator("#cursos").scrollIntoViewIfNeeded();
  const track = page.locator(".carousel-track");
  await expect(page.getByRole("button", { name: "Pausar movimento automático" })).toBeDisabled();
  const before = await track.evaluate(el => getComputedStyle(el).transform);
  await page.waitForTimeout(1800);
  expect(await track.evaluate(el => getComputedStyle(el).transform)).toBe(before);
  const box = await page.locator(".carousel-viewport").boundingBox();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 280, y: box!.y + 80 }] });
  for (let x = 260; x >= 60; x -= 20) await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: box!.y + 80 }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await page.waitForTimeout(700);
  expect(await track.evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
  await context.close();
});




