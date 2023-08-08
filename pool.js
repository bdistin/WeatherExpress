import puppeteer from 'puppeteer';
import genericPool from 'generic-pool';

class PuppeteerPagePool {

	static async create() {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox'],
			headless: 'new',
			defaultViewport: null
		});
		return browser.newPage();
	}

	static destroy(page) {
		return page.browser.close();
	}

	static validate(page) {
		return page.browser.isConnected() && !page.isClosed();
	}

}

export default genericPool.createPool(PuppeteerPagePool, {
	min: 2,
	max: 10,
	testOnBorrow: true
});
