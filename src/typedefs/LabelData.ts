// Local imports
import { type AccountType } from './AccountType'





export type LabelData = {
	availability: AccountType[],
	displayName: string,
	id: number,
	labelID: string,
	requiresVerification: boolean,
	verificationTemplate?: string,
}
