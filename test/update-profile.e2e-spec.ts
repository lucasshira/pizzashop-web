// teste E2E de atualizar perfil da loja

import { expect, test } from '@playwright/test';

test('update profile successfully', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Pizza Shop' }).click();
 
  await page.getByText('Perfil da Loja').click();

  await page.getByLabel('Nome').fill('Rocket Pizza');
  await page.getByLabel('Descrição').fill('Uma descricao de teste');

  await page.getByRole('button', { name: 'Salvar' }).click();

  const toast = page.getByText("Perfil atualizado com sucesso");

  expect(toast).toBeVisible();

  await page.waitForTimeout(2000)
});

test('update profile with an invalid name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Pizza Shop' }).click();
 
  await page.getByText('Perfil da Loja').click();

  await page.getByLabel('Nome').fill('Invalid Restaurant Name');
  await page.getByLabel('Descrição').fill('Uma descricao de teste');

  await page.getByRole('button', { name: 'Salvar' }).click();

  const toast = page.getByText("Falha ao atualizar perfil, tente novamente!");

  expect(toast).toBeVisible();

  await page.waitForTimeout(2000)
});