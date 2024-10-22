// Module imports
import fs from 'node:fs/promises'
import Handlebars from 'handlebars'
import path from 'node:path'





// Constants
const TEMPLATE_CACHE: Map<string, HandlebarsTemplateDelegate[]> = new Map
const TEMPLATE_PATH = path.join(process.cwd(), 'src', 'templates')





export async function renderTemplate(templateName: string, data: Record<string, unknown> = {}) {
	if (!TEMPLATE_CACHE.has(templateName)) {
		const templateFilePath = path.join(TEMPLATE_PATH, `${templateName.replace(/\.hbs$/, '')}.hbs`)
		const templateFileString = await fs.readFile(templateFilePath, 'utf8')
		const compiledTemplate = templateFileString
			.split('---')
			.map(message => message.trim())
			.map(message => Handlebars.compile(message))

		TEMPLATE_CACHE.set(templateName, compiledTemplate)
	}

	return TEMPLATE_CACHE
		.get(templateName)!
		.map((templateItem: HandlebarsTemplateDelegate) => templateItem(data))
}
