import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://emailmanager-frontend-phi.vercel.app/');
  await page.getByPlaceholder('Correo o nombre de usuario').click();
  await page.getByPlaceholder('Correo o nombre de usuario').fill('tomi');
  await page.getByPlaceholder('Correo o nombre de usuario').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('123');
  await page.getByRole('button', { name: 'Iniciar sesion' }).click();
  await page.getByRole('button', { name: 'Enviar correo' }).click();
  await page.locator('#correopara').click();
  await page.locator('#correopara').fill('tomi');
  await page.locator('#correopara').press('Tab');
  await page.getByPlaceholder('Asunto').fill('hola');
  await page.getByPlaceholder('Asunto').press('Tab');
  await page.getByPlaceholder('Mensaje').fill('hola');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  await page.getByRole('button', { name: 'bandeja de enviados' }).click();
  await page.getByText('tomi').nth(2).click();
  await page.locator('#template_correoseleccionado').getByText('tomi').click();
  await page.getByText('correo@ejemplo.com').click();
  await page.getByText('hola').nth(3).click();
  await page.getByText('hola').nth(4).click();
});