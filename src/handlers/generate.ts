import { Request, Response } from 'express'
import getGeneratedText, { Styles, ResponseDetails } from '../generateText'
import puppeteer from 'puppeteer'

type RequestQueries = {
	query: string
	style: Styles
}

export default (browser: puppeteer.Browser) =>
	async (request: Request<{}, {}, {}, RequestQueries>, response: Response) => {
		const { query, style } = request.query

		if (!query || !(style in Styles)) {
			const errorDetails: ResponseDetails = {
				generatedText: null,
				timeSpent: 0,
				error: 'Не были переданы query или style',
			}

			response.json(errorDetails)
			return
		}

		const generatedText = await getGeneratedText(browser, query, style)

		response.json(generatedText)
	}
