// Module imports
import {
	Counter,
	Gauge,
	Histogram,
} from 'prom-client'





// Constants
export const messageCounter = new Counter({
  name: 'total_messages_received',
  help: 'metric_help',
})
export const inProgressApplications = new Gauge({
  name: 'applications_in_progress',
  help: 'metric_help',
})
