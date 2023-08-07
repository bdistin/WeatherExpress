import puppeteer from 'puppeteer';
import genericPool from 'generic-pool';

const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: 'new',
    defaultViewport: null
});

class PuppeteerPagePool {

	static async create() {
		return browser.newPage();
	}

	static destroy(pageInstance) {
		return pageInstance.close();
	}

	static validate() {
		return Promise.resolve(true);
	}

}

export default genericPool.createPool(PuppeteerPagePool, {
	min: 2,
	max: 10,
	testOnBorrow: true
});
