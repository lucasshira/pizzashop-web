// teste E2E de atualizar perfil da loja

import { expect, test } from '@playwright/test';

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Pizza Shop' }).click();
 
  await page.getByRole('menuitem', { name: 'Perfil da Loja' }).click();

  await page.getByLabel('Nome').fill('Rocket Pizza');
  await page.getByLabel('Descrição').fill('Uma descricao de teste de sucesso');

  await page.getByRole('button', { name: 'Salvar' }).click();

  // aguarda toda requisicao HTTP que esteja sendo feita ser finalizada
  await page.waitForLoadState('networkidle');

  const toast = page.getByText("Perfil atualizado com sucesso");

  await expect(toast).toBeVisible();

  await page.getByRole('button', { name: 'Close' }).click();

  // apos trocar o nome com sucesso e fechar o modal, esperamos que o nome tenha sido trocado
  await expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible();
});

test('update profile with an invalid name', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Pizza Shop' }).click();
 
  await page.getByText('Perfil da Loja').click();

  await page.getByLabel('Nome').fill('Invalid Restaurant Name');
  await page.getByLabel('Descrição').fill('Uma descricao de teste de erro');

  await page.getByRole('button', { name: 'Salvar' }).click();

  const toast = page.getByText("Falha ao atualizar perfil, tente novamente!");

  await expect(toast).toBeVisible();
});