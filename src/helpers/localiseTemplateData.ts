// Local imports
import { type SupportedLanguageCodes } from '../typedefs/SupportedLanguageCodes'





export function localiseTemplateData(languageCode: SupportedLanguageCodes, data: Record<string, any>) {
	if (Array.isArray(data)) {
		return data.map((item): Record<string, any> => localiseTemplateData(languageCode, item))
	} else if ((typeof data === 'object') && !Array.isArray(data)) {
		const localisedData: Record<string, any> = {}

		for (const key in data) {
			const value = data[key]

			if (key === 'locales') {
				const localisedValue = value.find((item: Record<string, any>) => item.lang === languageCode)
				Object.assign(localisedData, localisedValue)
			} else {
				localisedData[key] = localiseTemplateData(languageCode, value)
			}
		}

		return localisedData
	}

	return data
}
