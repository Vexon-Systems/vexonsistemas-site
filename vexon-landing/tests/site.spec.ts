import { expect, test } from "@playwright/test";

test("home renders its primary conversion path", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Tecnologia para organizar");
  await expect(page.getByRole("link", { name: "Conversar sobre meu projeto" })).toHaveAttribute("href", /wa\.me/);
  await expect(page.getByRole("link", { name: "Criar meu site" })).toHaveAttribute("href", "/solucoes/sites-institucionais");
});

test("mobile navigation opens and restores the trigger", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Abrir menu" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Menu de navegação" })).toBeVisible();
  await page.getByRole("button", { name: "Fechar menu" }).click();
  await expect(page.getByRole("dialog", { name: "Menu de navegação" })).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("contact form blocks invalid submissions without a network request", async ({ page }) => {
  await page.goto("/contato");
  await page.getByRole("button", { name: "Enviar solicitação" }).click();

  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await expect(page.getByText("Informe um WhatsApp com DDD.")).toBeVisible();
  await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
});

test("unknown routes show the custom not-found page", async ({ page }) => {
  await page.goto("/pagina-inexistente");

  await expect(page.getByRole("heading", { level: 1, name: "Esta página não foi encontrada." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Voltar ao início" })).toHaveAttribute("href", "/");
});
