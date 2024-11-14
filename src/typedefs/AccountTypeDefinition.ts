// Local imports
import { type AccountType } from './AccountType'
import { type SupportedLanguageCodes } from './SupportedLanguageCodes'





export interface AccountTypeDefinition {
	id: '1' | '2' | '3',
	labelID: AccountType,
	locales: {
		displayName: string,
		lang: SupportedLanguageCodes,
	}[],
}
