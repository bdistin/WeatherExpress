const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.get('/', async (request, response) => {
	try {
		if (!request.query.zip) {
			response
				.status(400)
				.send('A Zip Code is required to be provided.');
		}
		response
			.set('Content-Type', 'image/png')
			.send(await getImage(request.query.zip));
	} catch (error) {
		console.log(error);
	}
});

async function getImage(zip) {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: 'new',
		defaultViewport: null
	});
	const page = await browser.newPage();
	await page.goto(`https://weather.com/weather/tenday/l/${zip}`);
	await page.waitForSelector('#WxuDailyCard-main-a43097e1-49d7-4df7-9d1a-334b29628263 > section');
	const element = await page.$('#WxuDailyCard-main-a43097e1-49d7-4df7-9d1a-334b29628263 > section');
	const image = await element.screenshot();
	await browser.close();
	return image;
}

const listener = app.listen(3000, () => {
	console.log(`Your app is listening on port ${listener.address().port}`);
});
