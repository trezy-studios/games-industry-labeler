// Local imports
import { type AccountTypeDefinition } from '../typedefs/AccountTypeDefinition'
import { LABEL_DEFINITIONS } from '../data/LABEL_DEFINITIONS'





export function getLabelsForAccountType(accountType: AccountTypeDefinition) {
	return LABEL_DEFINITIONS.filter(labelDefinition => {
		return labelDefinition.availability.includes(accountType.labelID)
	})
}
