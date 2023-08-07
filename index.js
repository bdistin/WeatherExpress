const express = require('express');
const app = express();
const pool = require('./pool.js');

app.get('/', async (request, response) => {
	try {
		if (!request.query.zip) {
			response
				.status(400)
				.send('A Zip Code is required to be provided.');
		} else {
			// Get image first just incase getImage throws an error
			const image = await getImage(request.query.zip);
			response
				.set('Content-Type', 'image/png')
				.send(image);
		}
	} catch (error) {
		response
			.status(500)
			.send(error.message);
	}
});

async function getImage(zip) {
	const browser = await pool.acquire();
	const page = await browser.newPage();
	await page.goto(`https://weather.com/weather/tenday/l/${zip}`);
	await page.waitForSelector('#WxuDailyCard-main-a43097e1-49d7-4df7-9d1a-334b29628263 > section');
	const element = await page.$('#WxuDailyCard-main-a43097e1-49d7-4df7-9d1a-334b29628263 > section');
	const image = await element.screenshot();
	await pool.release(browser);
	return image;
}

const listener = app.listen(3000, () => {
	console.log(`Your app is listening on port ${listener.address().port}`);
});
