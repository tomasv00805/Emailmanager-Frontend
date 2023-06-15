import { test, expect } from '@playwright/test';

test('Test Ver Correo Enviado', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');
  await page.getByPlaceholder('Correo o nombre de usuario').click();
  await page.getByPlaceholder('Correo o nombre de usuario').fill('gabriel');
  await page.getByPlaceholder('Correo o nombre de usuario').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('123');
  await page.getByPlaceholder('Contraseña').press('Enter');
  await page.getByRole('button', { name: 'Enviar correo' }).click();
  await page.getByPlaceholder('Para').click();
  await page.getByPlaceholder('Para').fill('gabriel');
  await page.getByPlaceholder('Para').press('Tab');
  await page.getByPlaceholder('Asunto').fill('test');
  await page.getByPlaceholder('Asunto').press('Tab');
  await page.getByPlaceholder('Mensaje').fill('test2');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  await page.getByRole('button', { name: 'bandeja de enviados' }).click();
  await page.waitForTimeout(2000);
  await page.locator('#correos').getByText('gabriel').nth(0).click();
  await expect(page.locator('#template_correoseleccionado').getByText('gabriel')).toBeVisible();
});

/*test('Test Ver Correo', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');
  await page.getByPlaceholder('Correo o nombre de usuario').click();
  await page.getByPlaceholder('Correo o nombre de usuario').fill('gabriel');
  await page.getByPlaceholder('Correo o nombre de usuario').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('123');
  await page.getByPlaceholder('Contraseña').press('Enter');
  await page.getByRole('button', { name: 'Enviar correo' }).click();
  await page.waitForTimeout(2000);
  await page.getByPlaceholder('Para').click();
  await page.getByPlaceholder('Para').fill('tomi');
  await page.getByPlaceholder('Para').press('Tab');
  await page.getByPlaceholder('Asunto').fill('test');
  await page.getByPlaceholder('Asunto').press('Tab');
  await page.getByPlaceholder('Mensaje').fill('test');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  await page.getByRole('button', { name: 'bandeja de enviados' }).click();
  await page.waitForTimeout(2000);
  await page.getByText('tomi').nth(0).click();
  await expect(page.locator('#template_correoseleccionado').getByText('tomi')).toBeVisible();
});*/

//npx playwright codegen http://127.0.0.1:5500/ 