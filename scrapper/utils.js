const puppeteer = require('puppeteer');

const launchBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  return browser;
};

module.exports = launchBrowser;
