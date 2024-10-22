// Local imports
import { type AccountTypeDefinition } from '../typedefs/AccountTypeDefinition'
import labels from '../data/labels.json' with { type: 'json' }





export function getLabelsForAccountType(accountType: AccountTypeDefinition) {
	return labels.filter(label => {
		return label.availability.includes(accountType.labelID)
	})
}
