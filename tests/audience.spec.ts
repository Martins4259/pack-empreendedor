import { test, expect } from "@playwright/test";

const title = "Conhecimento para quem quer ir mais longe";
const lead = "Seja para começar um negócio ou melhorar a gestão da sua empresa, este pack reúne conteúdos sobre finanças, marketing, atendimento e desenvolvimento profissional.";
const support = "Uma seleção de cursos gratuitos para quem deseja aprender, organizar melhor sua rotina e desenvolver habilidades importantes para empreender.";

for (const width of [375, 390, 768, 1024, 1440, 1920]) {
  test(`Bloco 2: conteúdo, ordem e composição em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const section = page.getByRole("region", { name: title });
    await expect(section).toBeVisible();
    await expect(page.locator("#cursos + #para-quem")).toHaveCount(1);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(title);
    await expect(section.locator("p").nth(0)).toHaveText(lead);
    await expect(section.locator("p").nth(1)).toHaveText(support);
    await section.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    const photo = section.getByRole("img", { name: "Mulher de vestido amarelo trabalhando em um notebook em uma pequena loja de roupas" });
    await expect(photo).toBeVisible();
    await photo.evaluate(async (image: HTMLImageElement) => image.decode());
    const metrics = await section.evaluate(element => {
      const image = element.querySelector("img")!;
      const copy = element.querySelector("h2")!.parentElement!;
      const r = image.getBoundingClientRect();
      const c = copy.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        naturalWidth: image.naturalWidth,
        fit: getComputedStyle(image).objectFit,
        image: { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right },
        copy: { x: c.x, y: c.y, right: c.right, bottom: c.bottom },
        section: { x: box.x, right: box.right },
        textSizes: [...element.querySelectorAll("p")].map(p => parseFloat(getComputedStyle(p).fontSize)),
      };
    });
    expect(metrics.overflow).toBeLessThanOrEqual(1);
    expect(metrics.naturalWidth).toBeGreaterThanOrEqual(Math.floor(metrics.image.width));
    expect(metrics.fit).toBe("cover");
    expect(metrics.image.x).toBeGreaterThanOrEqual(24);
    expect(metrics.image.right).toBeLessThanOrEqual(width - 23);
    expect(metrics.image.width / metrics.image.height).toBeCloseTo(width >= 1024 ? 4 / 3 : 3 / 2, 2);
    for (const size of metrics.textSizes) expect(size).toBeGreaterThanOrEqual(15);
    if (width >= 1024) {
      expect(metrics.image.x).toBeGreaterThan(metrics.copy.right);
      expect(metrics.image.y).toBeLessThan(metrics.copy.bottom);
    } else {
      expect(metrics.image.y).toBeGreaterThan(metrics.copy.bottom);
    }
    await section.screenshot({ path: `docs/screenshots/bloco-2/${width}.png` });
  });
}


