import { Browser } from 'puppeteer'

export enum Styles {
	'Валентинка' = 1,
	'Без стиля' = 0,
	'Как у Чехова' = 18,
	'Теории заговора' = 1,
	'ТВ-репортажи' = 2,
	'Тосты' = 3,
	'Народные мудрости' = 11,
	'Пацанские цитаты' = 4,
	'Рекламные слоганы' = 5,
	'Короткие истории' = 6,
	'Подписи в Instagram' = 7,
	'Короче, Википедия' = 8,
	'Гороскоп' = 10,
}

/**
 * Opens a new page with Yandex Balabola and request the query in it
 */
export default async function getGeneratedText(
	browser: Browser,
	query: string,
	style: Styles
): Promise<string> {
	const page = await browser.newPage()

	// Goes to Balabola site
	await page.goto(`https://yandex.ru/lab/yalm?style=${style}`)

	// Closes the disclaimer
	const button = await page.$('#html-curtain__button')
	await button.click()

	// Types a query into the textarea
	await page.waitForSelector('textarea')
	await page.focus('textarea')
	await page.keyboard.type(query)

	// Submits a query
	await page.click('button.submit')

	try {
		// Waits for a response
		await page.waitForSelector('div.response')

		// Gets the response content
		const result = await page.$eval(
			'.balaboba-response-text-span',
			(el) => el.textContent
		)

		return result
	} catch (error) {
		const errorMessage = await page.$eval(
			'p.init__error',
			(el) => el.textContent
		)

		return errorMessage
	}
}
