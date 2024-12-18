// Local imports
import { type AccountTypeDefinition } from '../typedefs/AccountTypeDefinition'





export const ACCOUNT_TYPE_DEFINITIONS: AccountTypeDefinition[] = [
	{
		id: '1',
		locales: [
			{
				displayName: 'Individual',
				lang: 'en'
			}
		],
		labelID: 'individual'
	},
	{
		id: '2',
		locales: [
			{
				displayName: 'Organization',
				lang: 'en'
			}
		],
		labelID: 'organization'
	},
	{
		id: '3',
		locales: [
			{
				displayName: 'Game',
				lang: 'en'
			}
		],
		labelID: 'game'
	},
]
