import { expect, test } from "@playwright/test";

test("home renders its primary conversion path", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Sites e sistemas");
  await expect(page.getByRole("link", { name: "Conversar sobre meu projeto" })).toHaveAttribute(
    "href",
    /wa\.me/,
  );
  await expect(page.getByRole("link", { name: "Criar meu site" })).toHaveAttribute(
    "href",
    "/solucoes/sites-institucionais/",
  );
});

test("mobile navigation closes with Escape and restores the trigger", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Abrir menu" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Menu de navegação" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Menu de navegação" })).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("mobile solutions support keyboard navigation and reopen on the active service", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu de navegação" });
  const solutions = menu.getByRole("button", { name: "Soluções", exact: true });
  await expect(solutions).toHaveAttribute("aria-expanded", "false");
  await page.screenshot({ path: "test-results/mobile-menu.png" });
  await solutions.focus();
  await solutions.press("Enter");
  await expect(solutions).toHaveAttribute("aria-expanded", "true");
  await page.screenshot({ path: "test-results/mobile-menu-expanded.png" });
  await page.keyboard.press("Tab");
  const service = menu.getByRole("link", { name: "Sites institucionais" });
  await expect(service).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/solucoes\/sites-institucionais\/$/);
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(solutions).toHaveAttribute("aria-expanded", "true");
  await expect(service).toHaveAttribute("aria-current", "page");
});

test("short mobile menu keeps its close and contact actions visible while the list scrolls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu de navegação" });
  await menu.getByRole("button", { name: "Soluções", exact: true }).click();
  const cta = menu.getByRole("link", { name: "Conversar pelo WhatsApp" });
  await expect(cta).toBeInViewport();
  const before = await cta.boundingBox();
  await menu.getByRole("link", { name: "Contato", exact: true }).scrollIntoViewIfNeeded();
  await expect(menu.getByRole("button", { name: "Fechar menu" })).toBeInViewport();
  await expect(cta).toBeInViewport();
  const after = await cta.boundingBox();
  expect(after?.y).toBe(before?.y);
  expect(await menu.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.screenshot({ path: "test-results/mobile-menu-short.png" });
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(menu).toBeHidden();
});

test("FAQ expands its answer", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Quanto custa um projeto?" }).click();
  await expect(
    page.getByText(
      "O valor depende do tipo de solução, escopo, nível de personalização e serviços envolvidos.",
    ),
  ).toBeVisible();
});

test("floating WhatsApp CTA is available", async ({ page }) => {
  await page.goto("/sobre");

  await expect(
    page.getByRole("link", { name: "Conversar com a Vexon pelo WhatsApp" }),
  ).toHaveAttribute("href", /wa\.me/);
});

test("unconfigured contact form offers an actionable fallback", async ({ page }) => {
  await page.goto("/contato");
  const submit = page.getByRole("button", { name: "Enviar solicitação" });
  if (await submit.isEnabled()) {
    await submit.click();
    await expect(page.getByText("Informe seu nome.")).toBeVisible();
    await expect(page.getByText("Informe um WhatsApp com DDD.")).toBeVisible();
  } else {
    await expect(page.getByRole("link", { name: "Continuar pelo WhatsApp" })).toHaveAttribute(
      "href",
      /wa\.me/,
    );
  }
});

test("Pages serves headers, static assets and the contact Function", async ({ request }) => {
  const home = await request.get("/");
  expect(home.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect((await request.get("/opengraph-image")).status()).toBe(200);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/sobre/__next.sobre.__PAGE__.txt")).status()).toBe(200);
  expect((await request.get("/opengraph-image")).headers()["content-type"]).toContain("image/png");
  expect((await request.get("/api/contact")).status()).toBe(405);
  const invalid = await request.post("/api/contact", { data: {} });
  expect(invalid.status()).toBe(400);
  expect(await invalid.json()).toEqual({ error: "invalid_data" });
});

for (const width of [320, 390, 768, 1440]) {
  test(`home has no overflow or clipped project links at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page
        .locator(".home-hero")
        .evaluate(
          (el) =>
            Math.abs(
              el.getBoundingClientRect().height +
                document.querySelector("header")!.getBoundingClientRect().height -
                innerHeight,
            ) <= 2,
        ),
    ).toBe(true);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    const cards = page
      .locator("article")
      .filter({ has: page.getByRole("link", { name: "Conhecer o projeto" }) });
    for (const card of await cards.all()) {
      expect(await card.evaluate((el) => el.scrollHeight <= el.clientHeight + 2)).toBe(true);
    }
    await expect(
      page.getByRole("link", { name: "Conversar com a Vexon pelo WhatsApp" }),
    ).toBeHidden();
    await page.screenshot({ path: `test-results/home-${width}.png`, animations: "disabled" });
    await page.getByRole("heading", { name: "Projetos em construção." }).scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("link", { name: "Conversar com a Vexon pelo WhatsApp" }),
    ).toBeVisible();
    await page.locator("#contato").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/contact-${width}.png`, animations: "disabled" });
  });
}

test("exported navigation opens the service page without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("link", { name: "Criar meu site" }).click();
  await expect(page).toHaveURL(/\/solucoes\/sites-institucionais\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("transmite confiança");
  await expect(page.getByLabel("Solução procurada (obrigatório)")).toHaveValue(
    "Site institucional",
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: "test-results/service-desktop.png", animations: "disabled" });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "test-results/service-mobile.png", animations: "disabled" });
  expect(errors).toEqual([]);
});

test("about page keeps its reading and contact paths usable across screen sizes", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/sobre/");
    expect(
      await page
        .locator(".about-intro")
        .evaluate(
          (el) =>
            Math.abs(
              el.getBoundingClientRect().height +
                document.querySelector("header")!.getBoundingClientRect().height -
                innerHeight,
            ) <= 2,
        ),
    ).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({ path: "test-results/about-" + width + ".png" });
    await page.getByRole("link", { name: "Conheça nossa história" }).click();
    await expect(
      page.getByRole("heading", { name: "Quatro estudantes. Uma ideia em comum." }),
    ).toBeInViewport();
    await expect(page.getByText("Imagem ilustrativa · Planejar antes de construir")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Conversar sobre meu projeto", exact: true }),
    ).toHaveAttribute("href", "/contato/");
    if (width === 1440) await page.screenshot({ path: "test-results/about-origin.png" });
  }
});

const heroRoutes = [
  "/",
  "/sobre/",
  "/contato/",
  "/projetos/",
  "/politica-de-privacidade/",
  "/termos-de-uso/",
  "/solucoes/sites-institucionais/",
  "/solucoes/landing-pages/",
  "/solucoes/lojas-virtuais/",
  "/solucoes/sistemas-sob-medida/",
  "/projetos/sellion-pdv/",
  "/projetos/consultor-hub/",
  "/projetos/telemetria-de-pivos/",
];

for (const viewport of [
  { width: 320, height: 700 },
  { width: 390, height: 844 },
  { width: 768, height: 900 },
  { width: 1440, height: 900 },
]) {
  test(
    "all page heroes fit the first screen and load their image at " + viewport.width + "px",
    async ({ page }) => {
      await page.setViewportSize(viewport);
      for (const path of heroRoutes) {
        await page.goto(path);
        const hero = page.locator("main .viewport-hero");
        const metrics = await hero.evaluate((el) => ({
          total:
            el.getBoundingClientRect().height +
            document.querySelector("header")!.getBoundingClientRect().height,
          viewport: innerHeight,
          overflow: document.documentElement.scrollWidth > innerWidth,
        }));
        expect(Math.abs(metrics.total - metrics.viewport), path).toBeLessThanOrEqual(2);
        expect(metrics.overflow, path).toBe(false);
        await expect(page.getByRole("heading", { level: 1 })).toBeInViewport({ ratio: 1 });
        const image = hero.locator("img");
        await expect
          .poll(
            () =>
              image.evaluate(
                (el) =>
                  (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0,
              ),
            { message: path },
          )
          .toBe(true);
        const filename = path === "/" ? "home" : path.split("/").filter(Boolean).join("-");
        await page.screenshot({
          path: "test-results/hero-" + filename + "-" + viewport.width + ".png",
          animations: "disabled",
        });
      }
    },
  );
}

test("desktop navigation uses the same red state and supports its service menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  const home = nav.getByRole("link", { name: "Início", exact: true });
  expect(await home.evaluate((el) => getComputedStyle(el, "::after").backgroundColor)).toBe(
    "rgb(217, 45, 42)",
  );
  const solutions = nav.getByRole("button", { name: "Soluções", exact: true });
  await solutions.focus();
  await solutions.press("Enter");
  await expect(solutions).toHaveAttribute("data-state", "open");
  expect(await solutions.evaluate((el) => getComputedStyle(el).boxShadow)).toBe("none");
  await page.screenshot({ path: "test-results/header-desktop.png" });
  await nav.getByRole("link", { name: "Lojas virtuais" }).click();
  await expect(page).toHaveURL(/lojas-virtuais/);
  await expect(solutions).toHaveAttribute("data-active", "true");
  expect(await solutions.evaluate((el) => getComputedStyle(el, "::after").backgroundColor)).toBe(
    "rgb(217, 45, 42)",
  );
  expect(
    await page
      .getByRole("heading", { level: 1 })
      .evaluate((el) => getComputedStyle(el, "::selection").backgroundColor),
  ).toBe("rgb(183, 31, 30)");
});

test("all exported public pages respond successfully", async ({ request }) => {
  for (const path of [
    "/sobre/",
    "/contato/",
    "/projetos/",
    "/politica-de-privacidade/",
    "/termos-de-uso/",
    "/solucoes/sites-institucionais/",
    "/solucoes/landing-pages/",
    "/solucoes/lojas-virtuais/",
    "/solucoes/sistemas-sob-medida/",
    "/projetos/sellion-pdv/",
    "/projetos/consultor-hub/",
    "/projetos/telemetria-de-pivos/",
  ]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});

test("unknown routes show the custom not-found page", async ({ page }) => {
  await page.goto("/pagina-inexistente");

  await expect(
    page.getByRole("heading", { level: 1, name: "Esta página não foi encontrada." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Voltar ao início" })).toHaveAttribute("href", "/");
});
