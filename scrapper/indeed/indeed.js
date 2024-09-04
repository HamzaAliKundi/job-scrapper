const { createJob } = require('../../server/controllers/jobs');
const userAgent = require('../const');
const launchBrowser = require('../utils');

const indeed = async () => {
  count = 10;
  while (true) {
    console.log('count : ', count);
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);

    await page.goto(
      `https://www.indeed.com/jobs?q=software+engineer&sort=date&start=${count}`
    );
    await page.waitForSelector('li.css-5lfssm');

    const jobData = await page.$$eval('li.css-5lfssm', (elements) => {
      return elements.map((element) => {
        const linkElement = element.querySelector('a.jcs-JobTitle');
        const titleElement = element.querySelector('span[id^="jobTitle"]');
        const companyElement = element.querySelector(
          'span[data-testid="company-name"]'
        );
        const locationElement = element.querySelector(
          'div[data-testid="text-location"]'
        );
        const descriptionElement = element.querySelector('ul li:first-child');

        return {
          jobDetailPage: linkElement ? linkElement.href : null,
          jobTitle: titleElement ? titleElement.textContent.trim() : null,
          company: companyElement ? companyElement.textContent.trim() : null,
          location: locationElement ? locationElement.textContent.trim() : null,
          description: descriptionElement
            ? descriptionElement.textContent.trim()
            : null,
          website: 'https://www.indeed.com',
        };
      });
    });

    const duplicateCount = await createJob(jobData);
    console.log('duplicate count : ', duplicateCount);
    if (duplicateCount > 10) break;
    count = count + 10;
  }
};

module.exports = indeed;
