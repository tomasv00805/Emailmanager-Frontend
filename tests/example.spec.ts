import { test, expect } from '@playwright/test';

test('crear usuario', async ({ page }) => {
  await page.goto('https://emailmanager-frontend-sable.vercel.app/');
  await page.getByRole('button', { name: 'Crear usuario' }).click();
  await page.getByPlaceholder('Usuario').click();
  await page.getByPlaceholder('Usuario').fill('pepe');
  await page.getByPlaceholder('Correo').click();
  await page.getByPlaceholder('Correo').fill('pepe@gmail.com');
  await page.getByPlaceholder('Correo').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('123');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByPlaceholder('Correo o nombre de usuario').click();
  await page.getByPlaceholder('Correo o nombre de usuario').fill('pepe');
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
});