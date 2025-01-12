// Teste E2E de Orders

import { expect, test } from '@playwright/test';

test('display orders list', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' });

  // testando se a lista aparece com o pedido de 1 ate 10
  await expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible();
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' });

  // testando paginacao indo pra proxima pagina
  await page.getByRole('button', { name: 'Próxima página' }).click();

  // pagina 2
  await expect(page.getByRole('cell', { name: 'Customer 11', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Customer 20', exact: true })).toBeVisible();

  expect(page.url()).toContain('page=2');
  await expect(page.getByText('Página 2 de 6')).toBeVisible();

  // ultima pagina
  await page.getByRole('button', { name: 'Última página' }).click();

  await expect(page.getByRole('cell', { name: 'Customer 51', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Customer 60', exact: true })).toBeVisible();

  expect(page.url()).toContain('page=6');
  await expect(page.getByText('Página 6 de 6')).toBeVisible();

  // pagina anterior
  await page.getByRole('button', { name: 'Página anterior' }).click();

  await expect(page.getByRole('cell', { name: 'Customer 41', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Customer 50', exact: true })).toBeVisible();

  expect(page.url()).toContain('page=5');
  await expect(page.getByText('Página 5 de 6')).toBeVisible();

  // primeira pagina
  await page.getByRole('button', { name: 'Primeira página' }).click();

  await expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Customer 10', exact: true })).toBeVisible();

  expect(page.url()).toContain('page=1');
  await expect(page.getByText('Página 1 de 6')).toBeVisible();
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' });

  await page.getByPlaceholder('ID do pedido').fill('order-10');

  await page.getByRole('button', { name: 'Filtrar resultados' }).click();

  await expect(page.getByRole('cell', { name: 'order-10' })).toBeVisible();
  expect(page.url()).toContain('orderId=order-10');
})

test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' });

  await page.getByPlaceholder('Nome do cliente').fill('Customer 10');

  await page.getByRole('button', { name: 'Filtrar resultados' }).click();

  await expect(page.getByRole('cell', { name: 'order-10' })).toBeVisible();
  expect(page.url()).toContain('customerName=Customer+10');
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' });

  await page.getByRole('combobox').click();
  await page.getByLabel('Pendente').click();

  await page.getByRole('button', { name: 'Filtrar resultados' }).click();

  await page.waitForSelector('table tbody tr');

  // pegando todas as celulas da minha tabela com Pendente
  const tableRows = await page.getByRole('cell', { name: 'Pendente' }).all();

  for (const row of tableRows) {
    await expect(row).toHaveText('Pendente');
  }
})