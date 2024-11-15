// Local imports
import { type LabelDefinition } from '../typedefs/LabelDefinition'





export const LABEL_DEFINITIONS: LabelDefinition[] = [
	{
		id: 1,
		availability: ['individual'],
		locales: [
			{
				displayName: 'Game Dev',
				lang: 'en',
			},
		],
		labelID: 'game-dev',
		requiresVerification: false,
	},
	{
		id: 2,
		availability: [
			'individual',
			'organization',
		],
		locales: [
			{
				displayName: 'Games Archivist',
				lang: 'en',
			},
		],
		labelID: 'games-archivist',
		requiresVerification: false,
	},
	{
		id: 3,
		availability: [
			'individual',
			'organization',
		],
		locales: [
			{
				displayName: 'Games Business',
				lang: 'en',
			},
		],
		labelID: 'games-business',
		requiresVerification: false,
	},
	{
		id: 4,
		availability: [
			'individual',
			'organization',
		],
		locales: [
			{
				displayName: 'Games Educator',
				lang: 'en',
			},
		],
		labelID: 'games-educator',
		requiresVerification: false,
	},
	{
		id: 5,
		availability: [
			'individual',
			'organization',
		],
		locales: [
			{
				displayName: 'Games Media',
				lang: 'en',
			},
		],
		labelID: 'games-media',
		requiresVerification: false,
	},
	{
		id: 6,
		availability: [
			'individual',
			'organization',
		],
		locales: [
			{
				displayName: 'Games Organizer',
				lang: 'en',
			},
		],
		labelID: 'games-organizer',
		requiresVerification: false,
	},
	{
		id: 7,
		availability: [
			'individual',
			'organization',
		],
		locales: [
			{
				displayName: 'Games Research',
				lang: 'en',
			},
		],
		labelID: 'games-research',
		requiresVerification: false,
	},
	{
		id: 8,
		availability: ['game'],
		locales: [
			{
				displayName: 'Game',
				lang: 'en',
			},
		],
		labelID: 'game',
		requiresVerification: true,
		verificationTemplate: 'verify-game',
	},
	{
		id: 9,
		availability: ['organization'],
		locales: [
			{
				displayName: 'Game Studio',
				lang: 'en',
			},
		],
		labelID: 'game-studio',
		requiresVerification: true,
		verificationTemplate: 'verify-studio',
	},
	{
		id: 10,
		locales: [
			{
				displayName: 'Games Event',
				lang: 'en',
			},
		],
		labelID: 'games-event',
		requiresVerification: true,
		availability: ['organization'],
		verificationTemplate: 'verify-event',
	},
	{
		id: 11,
		availability: ['individual'],
		locales: [
			{
				displayName: 'Games Journalist',
				lang: 'en',
			},
		],
		labelID: 'games-journalist',
		requiresVerification: true,
		verificationTemplate: 'verify-journalist',
	},
	{
		id: 12,
		availability: ['organization'],
		locales: [
			{
				displayName: 'Games Publication',
				lang: 'en',
			},
		],
		labelID: 'games-publication',
		requiresVerification: true,
		verificationTemplate: 'verify-publication',
	},
	{
		id: 13,
		availability: ['organization'],
		locales: [
			{
				displayName: 'Games Publisher',
				lang: 'en',
			},
		],
		labelID: 'games-publisher',
		requiresVerification: true,
		verificationTemplate: 'verify-publisher',
	},
]