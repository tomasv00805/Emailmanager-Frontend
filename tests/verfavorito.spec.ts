import { test, expect } from '@playwright/test';

test('Ver Favorito', async ({ page }) => {
  await page.goto('https://emailmanager-frontend-phi.vercel.app/');
  await page.getByPlaceholder('Correo o nombre de usuario').click();
  await page.getByPlaceholder('Correo o nombre de usuario').fill('gabriel');
  await page.getByPlaceholder('Correo o nombre de usuario').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('123');
  await page.getByPlaceholder('Contraseña').press('Enter');
  await page.getByRole('button', { name: 'Enviar correo' }).click();
  await page.getByPlaceholder('Para').click();
  await page.getByPlaceholder('Para').fill('tomi');
  await page.getByPlaceholder('Para').press('Tab');
  await page.getByPlaceholder('Asunto').fill('hola');
  await page.getByPlaceholder('Asunto').press('Tab');
  await page.getByPlaceholder('Mensaje').fill('test');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  await page.getByRole('button', { name: 'bandeja de enviados' }).click();
  await page.getByText('tomi').first().click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'fav' }).nth(1).click();
  await page.getByRole('button', { name: 'bandeja de favoritos' }).click();
  await page.getByText('hola').click();
  await page.getByText('gabrieltomi').nth(0).click();
  await page.getByText('gabriel, tomi').click();
  await page.getByText('correo@ejemplo.com').click();
  await page.locator('#template_correoseleccionado').getByText('test').click();
});
