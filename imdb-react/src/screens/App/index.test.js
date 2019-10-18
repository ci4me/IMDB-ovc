/**
 * @fileoverview Puppeteer Main Testing functions...
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */

const puppeteer = require('puppeteer');

// Test the movie searching...
describe('Search Form', () => {

  // Checks if the list is shown...
  it('should show list', async () => {
	let browser = await puppeteer.launch({
	  headless: false,
	  args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	let page = await browser.newPage();

	page.emulate({
	  viewport: {
		width: 1280,
		height: 720
	  },
	  userAgent: ''
	});

	await page.goto('http://localhost:3000/');
	await page.waitForSelector('form');
	await page.click('input[id=movie-input]');
	await page.type('input[id=movie-input]', 'Star Wars IV');
	await page.click('button[type=submit]');

	await page.waitForSelector('.MuiListItemText-primary');

	const movieTitle = await page.$eval('.MuiListItemText-primary', e => e.innerText);
	expect(movieTitle).toBe('Star Wars: Episode IV - A New Hope');

	browser.close();
  }, 60000);

  // Check if the modal is correctly opened...
  it('should show modal', async () => {
	let browser = await puppeteer.launch({
	  headless: false,
	  args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	let page = await browser.newPage();

	page.emulate({
	  viewport: {
		width: 1280,
		height: 720
	  },
	  userAgent: ''
	});

	await page.goto('http://localhost:3000/');
	await page.waitForSelector('form');
	await page.click('input[id=movie-input]');
	await page.type('input[id=movie-input]', 'Star Wars IV');
	await page.click('button[type=submit]');

	await page.waitForSelector('li');
	await page.click('li');
	await page.waitForSelector('h1');

	const movieTitle = await page.$eval('h1', e => e.innerText);
	expect(movieTitle).toBe('Star Wars: Episode IV - A New Hope');

	browser.close();
  }, 60000);  
});