// Local imports
import { type DBConvo } from '../typedefs/DBConvo'
import { getBot } from './getBot'





// Constants
const bot = await getBot()





export async function createModerationReport(did: `did:${string}`, convoState: DBConvo) {
	return bot.agent
		.withProxy('atproto_labeler', 'did:plc:dsae6lz5garrdkbicuor4chs')
		.call('com.atproto.moderation.createReport', {
			data: {
				reasonType: 'com.atproto.moderation.defs#reasonOther',
				reason: `Labels: ${convoState.verifiedLabels!.join(' | ')} ||||| Verification: ${convoState.verification!.join(' | ')}`,
				subject: {
					$type: 'com.atproto.admin.defs#repoRef',
					did,
				},
			},
		})
}
