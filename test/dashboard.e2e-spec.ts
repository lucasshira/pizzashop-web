// Serie de testes E2E do Dashboard

import { expect, test } from '@playwright/test';

test('display day orders amount metric', async ({ page }) =>{
  await page.goto('/', { waitUntil: 'networkidle' });

  expect(page.getByText('20', { exact: true })).toBeVisible();
  expect(page.getByText('-5% em relação a ontem')).toBeVisible();

  await page.waitForTimeout(1000);
})

test('display month revenue metric', async ({ page }) =>{
  await page.goto('/', { waitUntil: 'networkidle' });

  expect(page.getByText('R$ 200,00')).toBeVisible();
  expect(page.getByText('+8% em relação ao mês passado')).toBeVisible();

  await page.waitForTimeout(1000);
})

test('display month orders amount metric', async ({ page }) =>{
  await page.goto('/', { waitUntil: 'networkidle' });

  expect(page.getByText('10', { exact: true })).toBeVisible();
  expect(page.getByText('+2% em relação ao mês passado')).toBeVisible();

  await page.waitForTimeout(1000);
})

test('display canceled orders amount metric', async ({ page }) =>{
  await page.goto('/', { waitUntil: 'networkidle' });

  expect(page.getByText('5', { exact: true })).toBeVisible();
  expect(page.getByText('-5% em relação ao mês passado')).toBeVisible();

  await page.waitForTimeout(1000);
})