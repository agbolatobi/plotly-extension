import { test, expect } from '@jupyterlab/galata';

test.use({ autoGoto: false });

test('should emit console message when called from palette', async ({
  page
}) => {
  const logs: string[] = [];

  page.on('console', message => {
    logs.push(message.text());
  });

  await page.goto();

  await page.click('text=View');

  await page.click('text=Activate Command Palette');

  await page.fill(
    '[aria-label="Command Palette Section"] [placeholder="SEARCH"]',
    'plotly-extension:open-dialog'
  );

  await page.click('text=plotly-extension:open-dialog');

  await page.locator('input[type="text"]').fill('test');
  await page.locator('text=Ok').click();
  expect(await page.locator('text=test').count() == 1)
  
});