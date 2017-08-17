const fs = require('fs');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const speedline = require('speedline');

(async() => {
const browser = await puppeteer.launch();
const filename = 'trace.json';
const page = await browser.newPage();
try {
    await page.emulate(devices['iPhone 6']);
    await page.tracing.start({path: filename, screenshots: true});
    await page.goto('https://www.google.com');
    await page.tracing.stop();
    const results = await speedline(filename);
    console.log('Speed Index value:', results.speedIndex);
} catch (e) {
    console.error(e);
}
browser.close();
fs.unlinkSync(filename);
})();