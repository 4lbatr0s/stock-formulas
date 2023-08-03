import puppeteer from "puppeteer";

const browserPromise = puppeteer.launch({
  headless: 'new',
  ignoreHTTPSErrors: true,
  defaultViewport: null,
  args: [
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-setuid-sandbox",
    "--blink-settings=imagesEnabled=false"
  ],
});

export default browserPromise;
