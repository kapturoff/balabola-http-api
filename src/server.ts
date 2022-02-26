import express from 'express'
import puppeteer from 'puppeteer'
import generateHandler from './handlers/generate'
import stylesList from './handlers/stylesList'

// It's necessary to create this function, because it avoids using
// the top-level await and all of its corresponding problems.
async function main() {
	const app = express(),
		browser = await puppeteer.launch()

	app.get('/generate', generateHandler(browser))
	app.get('/styles', stylesList())

	console.log('Started!')
	app.listen(4000)
}

main()
