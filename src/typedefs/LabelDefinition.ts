// Local imports
import { type AccountType } from './AccountType'
import { type SupportedLanguageCodes } from './SupportedLanguageCodes'





export type LabelDefinition = {
	availability: AccountType[],
	id: number,
	labelID: string,
	listUri: `at://did:plc:${string}`
	locales: {
		displayName: string,
		lang: SupportedLanguageCodes,
	}[],
	requiresVerification: boolean,
	verificationTemplate?: string,
}
