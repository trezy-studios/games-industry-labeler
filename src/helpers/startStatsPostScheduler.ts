// Module imports
import { CronJob } from 'cron'





// Local imports
import { createStatsPost } from './createStatsPost'





export function startStatsPostScheduler() {
	new CronJob(
		'0 0 10 * * *',
		createStatsPost,
		null,
		true,
		'America/Chicago',
	)
}