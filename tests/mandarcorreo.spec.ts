import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://emailmanager-frontend-sable.vercel.app/');
  await page.getByPlaceholder('Correo o nombre de usuario').click();
  await page.getByPlaceholder('Correo o nombre de usuario').fill('tomi');
  await page.getByPlaceholder('Correo o nombre de usuario').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('123');
  await page.getByPlaceholder('Contraseña').press('Enter');
  await page.getByRole('button', { name: 'Enviar correo' }).click();
  await page.getByPlaceholder('Para').click();
  await page.getByPlaceholder('Para').click();
  await page.getByPlaceholder('Para').click();
  await page.getByPlaceholder('Para').fill('tomi');
  await page.getByPlaceholder('Para').press('Tab');
  await page.getByPlaceholder('Asunto').fill('123');
  await page.getByPlaceholder('Asunto').press('Tab');
  await page.getByPlaceholder('Mensaje').fill('test');
  await page.getByPlaceholder('Mensaje').press('Enter');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  await page.getByRole('button', { name: 'bandeja de entrada' }).click();
});