// Local imports
import { getBot } from './getBot'
import labels from '../data/labels.json' with { type: 'json' }
import { renderTemplate } from './renderTemplate'
import { queryOzoneDatabase } from './queryOzoneDatabase'





// Types
type LabelStatDefinition = {
	displayName: string,
	h24Count: number,
	show24Hour: boolean,
	totalCount: number,
}





export async function createStatsPost() {
	const bot = await getBot()

	const result = await queryOzoneDatabase(`
		SELECT
			val,
			COUNT(*) as total_count,
			COUNT(*) FILTER (
				WHERE CAST(cts AS timestamp) > NOW() - INTERVAL '24 hours'
			) as h24_count
		FROM label
		GROUP BY val
		ORDER BY total_count DESC
	`)

	const labelStats = labels.reduce((
		accumulator: {
			nonVerified: LabelStatDefinition[],
			verified: LabelStatDefinition[],
		},
		labelDefinition,
	) => {
		const labelData = result!.rows.find(row => row.val === labelDefinition.labelID)

		const labelStatDefinition: LabelStatDefinition = {
			displayName: labelDefinition.displayName,
			h24Count: labelData.h24_count,
			totalCount: labelData.total_count,
			show24Hour: labelData.h24_count > 0
		}

		if (labelDefinition.requiresVerification) {
			accumulator.verified.push(labelStatDefinition)
		} else {
			accumulator.nonVerified.push(labelStatDefinition)
		}

		return accumulator
	}, {
		nonVerified: [],
		verified: [],
	})

	const [nonVerifiedPostText] = await renderTemplate('labeling-stats-post-nonverified', {
		labelStats: labelStats.nonVerified,
	})
	const [verifiedPostText] = await renderTemplate('labeling-stats-post-verified', {
		labelStats: labelStats.verified,
	})

	const firstPost = await bot.post({ text: nonVerifiedPostText })

	await firstPost.reply({ text: verifiedPostText })
}
