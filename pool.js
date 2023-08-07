const puppeteer = require('puppeteer');
const genericPool = require('generic-pool');

class PuppeteerPool {

	static create() {
		return puppeteer.launch({
			args: ['--no-sandbox'],
			headless: 'new',
			defaultViewport: null
		});
	}

	static destroy(browserInstance) {
		return browserInstance.close();
	}

	static validate() {
		return Promise.resolve(true);
	}

}

module.exports = genericPool.createPool(PuppeteerPool, {
	min: 2,
	max: 10,
	testOnBorrow: true
});
