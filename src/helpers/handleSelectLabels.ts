// Module imports
import {
	type Conversation,
	type Profile,
} from '@skyware/bot'





// Local imports
import { type DBConvo } from '../typedefs/DBConvo'
import { inProgressApplications } from './metrics'
import { type LabelData } from '../typedefs/LabelData'
import labels from '../data/labels.json' with { type: 'json' }
import { logger } from './logger'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleSelectLabels(parsedMessage: string, user: Profile, convo: Conversation, convoState: DBConvo) {
	const selectedLabels = parsedMessage
		.replace(/\s/g, '')
		.split(',')
		.map(item => Number(item))

	const {
		recognisedLabels,
		unrecognisedLabels,
		verifiedLabels,
	} = selectedLabels.reduce((accumulator, labelID) => {
		const label = (labels as unknown as LabelData[]).find(label => label.id === labelID)

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
		recognisedLabels: [] as LabelData[],
		unrecognisedLabels: [] as number[],
		verifiedLabels: [] as LabelData[],
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

	let messages = await renderTemplate('selected-labels', {
		hasMultipleLabels: allRecognisedLabels.length > 1,
		labels: allRecognisedLabels,
		hasMultipleUnrecognisedLabels: unrecognisedLabels.length > 1,
		unrecognisedLabels,
	})

	if (recognisedLabels.length) {
		messages = messages.concat(await renderTemplate('applying-labels', { labels: recognisedLabels }))
	}

	await sendMessages(convo, messages)

	if (recognisedLabels.length) {
		await user.labelAccount(recognisedLabels.map(recognisedLabel => recognisedLabel.labelID))

		await sendMessages(convo, await renderTemplate('labels-applied-success', {
			hasMultipleLabels: recognisedLabels.length > 1,
			labels: recognisedLabels,
		}))
	}

	let deleteConvoState = false

	if (verifiedLabels.length) {
		convoState.state = 'awaiting-verification'
		await sendMessages(convo, await renderTemplate('awaiting-verification', {
			includesJournalist: verifiedLabels.some(label => label.labelID === 'games-journalist'),
		}))
	} else {
		inProgressApplications.dec()
		deleteConvoState = true
	}

	setConvoState(convoState, deleteConvoState)
}
