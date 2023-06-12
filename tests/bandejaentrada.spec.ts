import { test, expect } from '@playwright/test';

test('Ver Bandeja de Entrada', async ({ page }) => {
  await page.goto('https://emailmanager-frontend-phi.vercel.app/');
  await page.getByPlaceholder('Correo o nombre de usuario').click();
  await page.getByPlaceholder('Correo o nombre de usuario').fill('tomi');
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForTimeout(3000)
  await page.getByRole('button', { name: 'Enviar correo' }).click();
  await page.waitForTimeout(3000)
  await page.getByPlaceholder('Para').click();
  await page.getByPlaceholder('Para').fill('juli');
  await page.getByPlaceholder('Asunto').click();
  await page.getByPlaceholder('Asunto').fill('test');
  await page.getByPlaceholder('Mensaje').click();
  await page.getByPlaceholder('Mensaje').fill('test2');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  await page.getByRole('button', { name: 'bandeja de enviados' }).click();
  await page.waitForTimeout(3000)
  await page.getByText('juli').nth(0).click();
  //await page.locator('#correos').getByText('juli').click();
  //await page.locator('#template_correoseleccionado').getByText('juli').click();
  //await page.locator('#template_correoseleccionado').getByText('holaaaaaa', { exact: true }).click();
  //await page.locator('#template_correoseleccionado').getByText('holaaaaaaaaa').click();
  await expect(page.locator('#template_correoseleccionado').getByText('juli')).toBeVisible();
  await expect(page.locator('#template_correoseleccionado').getByText('test', { exact: true })).toBeVisible();
  await expect(page.locator('#template_correoseleccionado').getByText('test2')).toBeVisible();
});
