// @ts-check
const { devices } = require('@playwright/test')
const envName = process.env.ENV_NAME ||'local';

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './ssm',
  /* Maximum time one test can run for. */
  timeout: 75 * 1000,
  workers: 1,
  //Can set url: param here
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  reporter: process.env.CI ? [
    ['junit', {
      outputFile: 'playwright-report/results.xml'
    }],
    ['html', {
      open: 'always',
      outputFolder: `playwright-report/${envName}`
    }]
  ] : [['html', {
      open: 'always',
      outputFolder: `playwright-report/${envName}`
  }]],
  retries: 2,
  projects: [
    {
      name: 'de',
      grep: /@de/,
      use: {
        baseURL: process.env.BASE_URL,
        browserName: 'chromium',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: true,
        viewport: { width: 1920, height: 1080 },
        trace: 'retain-on-failure',
        launchOptions: {
          args: ['--start-maximized'],
          executablePath: process.platform === 'linux' ? '/root/.cache/ms-playwright/chromium-1045/chrome-linux/chrome' : undefined,
        }
      }
    },
    {
      name: 'uk',
      grep: /@uk/,
      use: {
        baseURL: process.env.BASE_URL,
        browserName: 'chromium',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: true,
        viewport: { width: 1920, height: 1080 },
        trace: 'retain-on-failure',
        launchOptions: {
          args: ['--start-maximized'],
          executablePath: process.platform === 'linux' ? '/root/.cache/ms-playwright/chromium-1045/chrome-linux/chrome' : undefined,
        },
        // @ts-ignore
      }
    }
  ],
  globalSetup: 'ssm/test_configuration/globalSetup.js'

}
module.exports = config
