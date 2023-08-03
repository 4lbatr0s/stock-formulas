import puppeteer from "puppeteer";

const launchBrowser = async () => {
  const browser = await puppeteer.launch({
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

  return browser;
};

export default launchBrowser;
