// teste E2E do Sign In

import { expect,test } from '@playwright/test';

test('sign in successfully', async ({ page }) => {
  // primeiramente comecar entrando na pagina de login
  await page.goto('/sign-in', { waitUntil: 'networkidle' });

  // pegando label do input Email, preenchendo ele com o email de sucesso
  await page.getByPlaceholder('example@email.com').fill('johndoe@example.com');

  // clicando no botao de acesso
  await page.getByRole('button', { name: 'Acessar painel' }).click();

  // crio uma variavel que vai armazenar o conteudo do toast que aparece quando clica no botao
  const toast = page.getByText("Enviamos um link de autenticação para seu e-mail.");

  // espero que ele seja um elemento visivel na pagina
  expect(toast).toBeVisible();
});

test('sign in with wrong credentials', async ({ page }) => {
  // primeiramente comecar entrando na pagina de login
  await page.goto('/sign-in', { waitUntil: 'networkidle' });

  // pegando label do input Email, preenchendo ele com o email de sucesso
  await page.getByPlaceholder('example@email.com').fill('wrongemail@example.com');

  // clicando no botao de acesso
  await page.getByRole('button', { name: 'Acessar painel' }).click();

  const toast = page.getByText("Credenciais inválidas.");

  // espero que ele seja um elemento visivel na pagina
  expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

test('navigate to new restaurant', async ({ page }) => {
  // primeiramente comecar entrando na pagina de login
  await page.goto('/sign-in', { waitUntil: 'networkidle' });

  // pegando um link que o texto Novo estabelecimento, e em seguida clico nele
  await page.getByRole('link', { name: 'Novo estabelecimento' }).click();

  // apos clicar, espero que a nova URL contenha sign-up
  expect(page.url()).toContain('/sign-up')
});