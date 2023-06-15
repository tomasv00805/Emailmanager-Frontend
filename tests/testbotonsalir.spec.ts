import { test, expect } from '@playwright/test';

test('Test Boton Salir', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');
  await page.getByPlaceholder('Correo o nombre de usuario').click();
  await page.getByPlaceholder('Correo o nombre de usuario').fill('gabriel');
  await page.getByPlaceholder('Correo o nombre de usuario').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('123');
  await page.getByPlaceholder('Contraseña').press('Enter');
  await page.getByRole('button', { name: 'Salir' }).click();
  await expect(page).toHaveURL('http://127.0.0.1:5500/');
});
