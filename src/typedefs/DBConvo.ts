// Local imports
import { type AccountType } from './AccountType'





export interface DBConvo {
	accountType?: AccountType,
	attemptingCancellation?: boolean,
	id: string,
	state?:
		| 'selecting-account-type'
		| 'selecting-labels'
		| 'applying-labels'
		| 'awaiting-verification'
		| 'verification-in-progress',
	verification?: string[],
	verifiedLabels?: string[],
}
