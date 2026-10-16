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

for (const width of [390, 768, 1440]) {
  test(`home has no overflow or clipped project links at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
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
    await page
      .getByRole("heading", { name: "Projetos que demonstram nossa capacidade" })
      .scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("link", { name: "Conversar com a Vexon pelo WhatsApp" }),
    ).toBeVisible();
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
