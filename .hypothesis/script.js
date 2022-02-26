import puppeteer from 'puppeteer'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const STYLES_ENUM = new Map([
	[1, 'Валентинка'],
	[0, 'Без стиля'],
	[18, 'Как у Чехова'],
	[1, 'Теории заговора'],
	[2, 'ТВ-репортажи'],
	[3, 'Тосты'],
	[11, 'Народные мудрости'],
	[4, 'Пацанские цитаты'],
	[5, 'Рекламные слоганы'],
	[6, 'Короткие истории'],
	[7, 'Подписи в Instagram'],
	[8, 'Короче, Википедия'],
	[10, 'Гороскоп'],
])

const { style, query } = yargs(hideBin(process.argv))
	.option('style', {
		alias: 's',
		type: 'number',
		description: 'Enum for the balabola style',
		default: 0,
		choices: [...STYLES_ENUM.keys()],
	})
	.option('query', {
		alias: 'q',
		type: 'string',
		description: 'Query to add',
	})
	.command({
		command: 'show-styles',
		description: 'Shows a list of the styles',
		handler: () => {
			const styles = [...STYLES_ENUM.entries()]
			console.log(
				`Available styles is: \n\n${styles
					.map((style) => `${style[0]}: ${style[1]}`)
					.join('\n')}`
			)
			process.exit()
		},
	})
	.parse()

async function main(query, style) {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(`https://yandex.ru/lab/yalm?style=${style}`)

	const button = await page.$('#html-curtain__button')
	await button.click()

	await page.waitForSelector('textarea')
	await page.focus('textarea')
	await page.keyboard.type(query)
	await page.click('button.submit')
	await page.waitForSelector('div.response')
	const result = await page.$eval(
		'.balaboba-response-text-span',
		(el) => el.textContent
	)

	console.log(result)

	await browser.close()
}

main(query, style)
