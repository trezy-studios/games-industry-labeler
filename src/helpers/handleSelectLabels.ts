// Module imports
import {
	type Conversation,
	type Profile,
} from '@skyware/bot'





// Local imports
import { type DBConvo } from '../typedefs/DBConvo'
import { getBot } from './getBot'
import { inProgressApplications } from './metrics'
import { type LabelDefinition } from '../typedefs/LabelDefinition'
import { LABEL_DEFINITIONS } from '../data/LABEL_DEFINITIONS'
import { logger } from './logger'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleSelectLabels(parsedMessage: string, user: Profile, convo: Conversation, convoState: DBConvo) {
	const bot = await getBot()

	const selectedLabels = parsedMessage
		.replace(/\s/g, '')
		.split(',')
		.map(item => Number(item))

	const {
		recognisedLabels,
		unrecognisedLabels,
		verifiedLabels,
	} = selectedLabels.reduce((accumulator, labelID) => {
		const label = LABEL_DEFINITIONS.find(label => label.id === labelID)

		if (label) {
			if (label.requiresVerification) {
				accumulator.verifiedLabels.push(label)
			} else {
				accumulator.recognisedLabels.push(label)
			}
		} else if (!Number.isNaN(labelID)) {
			accumulator.unrecognisedLabels.push(labelID)
		}

		return accumulator
	}, {
		recognisedLabels: [] as LabelDefinition[],
		unrecognisedLabels: [] as number[],
		verifiedLabels: [] as LabelDefinition[],
	})

	if (!recognisedLabels.length && !verifiedLabels.length) {
		logger.log('Message parsed; nothing for us to do.')
		logger.groupEnd()
		return
	}

	convoState.state = 'applying-labels'
	convoState.verifiedLabels = verifiedLabels.map(verifiedLabel => verifiedLabel.labelID)
	setConvoState(convoState)

	const allRecognisedLabels = recognisedLabels.concat(verifiedLabels)

	let messages = await renderTemplate('en', 'selected-labels', {
		hasMultipleLabels: allRecognisedLabels.length > 1,
		labels: allRecognisedLabels,
		hasMultipleUnrecognisedLabels: unrecognisedLabels.length > 1,
		unrecognisedLabels,
	})

	if (recognisedLabels.length) {
		messages = messages.concat(await renderTemplate('en', 'applying-labels', { labels: recognisedLabels }))
	}

	await sendMessages(convo, messages)

	if (recognisedLabels.length) {
		await user.labelAccount(recognisedLabels.map(recognisedLabel => recognisedLabel.labelID))

		await bot.agent.call('com.atproto.repo.applyWrites', {
			data: {
				repo: bot.profile.did,
				writes: recognisedLabels.map(recognisedLabel => ({
					$type: 'com.atproto.repo.applyWrites#create',
					collection: 'app.bsky.graph.listitem',
					value: {
						createdAt: new Date().toISOString(),
						list: recognisedLabel.listUri,
						subject: user.did,
					},
				})),
			},
		})

		await sendMessages(convo, await renderTemplate('en', 'labels-applied-success', {
			hasMultipleLabels: recognisedLabels.length > 1,
			labels: recognisedLabels,
		}))
	}

	let deleteConvoState = false

	if (verifiedLabels.length) {
		convoState.state = 'awaiting-verification'
		await sendMessages(convo, await renderTemplate('en', 'awaiting-verification', {
			includesJournalist: verifiedLabels.some(label => label.labelID === 'games-journalist'),
		}))
	} else {
		inProgressApplications.dec()
		deleteConvoState = true
	}

	setConvoState(convoState, deleteConvoState)
}
