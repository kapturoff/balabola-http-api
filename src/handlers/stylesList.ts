import { Request, Response } from 'express'
import { Styles } from '../generateText'

// Helper
function isNumber<T>(value: T): boolean {
	return isNaN(Number(value)) === false
}

// Turn enum into array
function toArray(anyEnumm: {
	[key: number]: string
}): { [key: string]: string }[] {
	return Object.entries(anyEnumm)
		.filter((key) => !isNumber(key[0]))
		.map((entry) => ({
			[entry[0]]: entry[1],
		}))
}

export default () => async (_: Request, response: Response) => {
	response.json(toArray(Styles))
}
