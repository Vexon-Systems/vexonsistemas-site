import { expect, test } from "@playwright/test";

const choices = [
  ["Apresentar minha empresa", "Site institucional", "sites-institucionais"],
  ["Divulgar uma oferta ou campanha", "Landing Page", "landing-pages"],
  ["Vender produtos online", "Loja virtual", "lojas-virtuais"],
  ["Organizar processos da empresa", "Sistema sob medida", "sistemas-sob-medida"],
];

for (const [goal, title, slug] of choices) {
  test(`finder recommends ${title} and carries it into the briefing`, async ({ page }) => {
    await page.goto("/");
    await page.locator("#qual-solucao > summary").click();
    const finder = page.locator("#qual-solucao");
    await finder.getByRole("button", { name: "Continuar", exact: true }).click();
    await expect(finder.getByText("Pergunta 1 de 3")).toBeVisible();
    await finder.getByRole("radio", { name: goal, exact: true }).check();
    await finder.getByRole("button", { name: "Continuar", exact: true }).click();
    await finder.getByRole("radio", { name: "Ainda não tenho uma solução", exact: true }).check();
    await finder.getByRole("button", { name: "Continuar", exact: true }).click();
    await finder.getByRole("radio", { name: "Começar com o essencial", exact: true }).check();
    await finder.getByRole("button", { name: "Voltar", exact: true }).click();
    await expect(
      finder.getByRole("radio", { name: "Ainda não tenho uma solução", exact: true }),
    ).toBeChecked();
    await finder.getByRole("button", { name: "Continuar", exact: true }).click();
    await expect(
      finder.getByRole("radio", { name: "Começar com o essencial", exact: true }),
    ).toBeChecked();
    await finder.getByRole("button", { name: "Ver recomendação" }).click();
    await expect(finder.locator(".guide-result")).toHaveText(title);
    if (slug === "sites-institucionais")
      await finder.screenshot({ path: "test-results/solution-finder-result.png" });
    await expect(finder.getByRole("link", { name: "Conhecer esta solução" })).toHaveAttribute(
      "href",
      `/solucoes/${slug}/`,
    );
    await finder.getByRole("link", { name: "Montar meu briefing" }).click();
    await expect(page.locator("#briefing select").first()).toHaveValue(title);
    await expect(page.locator("#briefing details")).toHaveAttribute("open", "");
    await expect(
      page.getByRole("heading", { name: "Vamos organizar sua ideia?" }),
    ).toBeInViewport();
    expect(new URL(page.url()).searchParams.get("situacao")).toBe("Ainda não tenho uma solução");
    expect(new URL(page.url()).searchParams.get("prioridade")).toBe("Começar com o essencial");
  });
}

test("briefing validates, preserves answers and only prepares a WhatsApp message", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contato/?solucao=lojas-virtuais#briefing");
  const briefing = page.locator("#briefing");
  await briefing.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(briefing.getByText("Como é sua rotina hoje?", { exact: true })).toBeVisible();
  await briefing
    .getByLabel("O que sua empresa faz e como resolve isso hoje? (obrigatório)")
    .fill("                ");
  await briefing.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(briefing.getByText("Como é sua rotina hoje?", { exact: true })).toBeVisible();
  await briefing.getByLabel("Empresa (opcional)").fill("Loja de exemplo");
  await briefing
    .getByLabel("O que sua empresa faz e como resolve isso hoje? (obrigatório)")
    .fill("Tenho uma loja e recebo pedidos por mensagens.");
  await briefing.getByRole("button", { name: "Continuar", exact: true }).click();
  await briefing
    .getByLabel("Qual problema você quer resolver primeiro? (obrigatório)")
    .fill("Quero organizar o catálogo e acompanhar os pedidos.");
  await briefing.getByRole("button", { name: "Revisar briefing" }).click();
  const link = briefing.getByRole("link", { name: "Continuar com o briefing no WhatsApp" });
  const message = new URL((await link.getAttribute("href"))!).searchParams.get("text");
  expect(message).toContain("Loja de exemplo");
  expect(message).toContain("Solução a avaliar: Loja virtual");
  expect(message).toContain("acompanhar os pedidos");
  await briefing.screenshot({ path: "test-results/briefing-mobile.png" });
  await briefing.getByRole("button", { name: "Editar briefing" }).click();
  await expect(briefing.getByLabel("Empresa (opcional)")).toHaveValue("Loja de exemplo");
  await expect(
    briefing.getByLabel("O que sua empresa faz e como resolve isso hoje? (obrigatório)"),
  ).toHaveValue("Tenho uma loja e recebo pedidos por mensagens.");
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("contact WhatsApp alternative preserves fields and never claims email delivery", async ({
  page,
}) => {
  await page.goto("/contato/");
  const form = page.locator("form").first();
  await form.getByLabel("Nome (obrigatório)").fill("Pessoa de exemplo");
  await form.getByLabel("Empresa (opcional)").fill("Empresa & Filhos");
  await form.getByLabel("WhatsApp (obrigatório)").fill("34999999999");
  await form
    .getByLabel("Mensagem (obrigatório)")
    .fill("Preciso de um site com serviços e contato.");
  const href = await form
    .getByRole("link", { name: "Continuar pelo WhatsApp" })
    .getAttribute("href");
  const text = new URL(href!).searchParams.get("text");
  expect(text).toContain("Pessoa de exemplo");
  expect(text).toContain("Empresa & Filhos");
  expect(text).toContain("Preciso de um site com serviços e contato.");
  await expect(page.getByText("Recebemos sua solicitação.", { exact: false })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Começar um projeto", exact: true })).toHaveCount(0);
});

test("service scope, contact and guides remain readable at common widths", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [, , slug] of choices) {
      await page.goto(`/solucoes/${slug}/`);
      await expect(
        page.getByRole("heading", { name: "O que preparar para começar" }),
      ).toBeVisible();
      await expect(page.getByRole("heading", { name: "O que avaliamos à parte" })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
    await page.goto("/contato/?solucao=sites-institucionais#briefing");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({ path: `test-results/briefing-start-${width}.png`, fullPage: true });
  }
});
