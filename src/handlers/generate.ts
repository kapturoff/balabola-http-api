import { Request, Response } from 'express'
import getGeneratedText, { Styles } from '../generateText'
import puppeteer from 'puppeteer'

type RequestQueries = {
	query: string
	style: Styles
}

export default (browser: puppeteer.Browser) =>
	async (request: Request<{}, {}, {}, RequestQueries>, response: Response) => {
		const { query, style } = request.query

		if (!query || !(style in Styles)) {
			response.send('Error: Query or style was not set.')
			return
		}

		const start = Date.now()
		const generatedText = await getGeneratedText(browser, query, style)
		const end = Date.now()

		response.json({
			timeSpent: (end - start) / 1000,
			generatedText,
		})
	}
