// Local imports
import { type LabelDefinition } from '../typedefs/LabelDefinition'





export const LABEL_DEFINITIONS: LabelDefinition[] = [
	{
		id: 1,
		availability: ['individual'],
		labelID: 'game-dev',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbatijgiol2a',
		locales: [
			{
				displayName: 'Game Dev',
				lang: 'en',
			},
		],
		requiresVerification: false,
	},
	{
		id: 2,
		availability: [
			'individual',
			'organization',
		],
		labelID: 'games-archivist',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbati7fwpu2n',
		locales: [
			{
				displayName: 'Games Archivist',
				lang: 'en',
			},
		],
		requiresVerification: false,
	},
	{
		id: 3,
		availability: [
			'individual',
			'organization',
		],
		labelID: 'games-business',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbathwfcvh2h',
		locales: [
			{
				displayName: 'Games Business',
				lang: 'en',
			},
		],
		requiresVerification: false,
	},
	{
		id: 4,
		availability: [
			'individual',
			'organization',
		],
		labelID: 'games-educator',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbathlnou527',
		locales: [
			{
				displayName: 'Games Educator',
				lang: 'en',
			},
		],
		requiresVerification: false,
	},
	{
		id: 5,
		availability: [
			'individual',
			'organization',
		],
		labelID: 'games-media',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbathbitsf2k',
		locales: [
			{
				displayName: 'Games Media',
				lang: 'en',
			},
		],
		requiresVerification: false,
	},
	{
		id: 6,
		availability: [
			'individual',
			'organization',
		],
		labelID: 'games-organizer',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbatgw74bl2t',
		locales: [
			{
				displayName: 'Games Organizer',
				lang: 'en',
			},
		],
		requiresVerification: false,
	},
	{
		id: 7,
		availability: [
			'individual',
			'organization',
		],
		labelID: 'games-research',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbatgkp3hu2w',
		locales: [
			{
				displayName: 'Games Research',
				lang: 'en',
			},
		],
		requiresVerification: false,
	},
	{
		id: 8,
		availability: ['game'],
		labelID: 'game',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbatg3uasa2z',
		locales: [
			{
				displayName: 'Game',
				lang: 'en',
			},
		],
		requiresVerification: true,
		verificationTemplate: 'verify-game',
	},
	{
		id: 9,
		availability: ['organization'],
		labelID: 'game-studio',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbatfihfgp2t',
		locales: [
			{
				displayName: 'Game Studio',
				lang: 'en',
			},
		],
		requiresVerification: true,
		verificationTemplate: 'verify-studio',
	},
	{
		id: 10,
		labelID: 'games-event',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbatenzf2624',
		locales: [
			{
				displayName: 'Games Event',
				lang: 'en',
			},
		],
		requiresVerification: true,
		availability: ['organization'],
		verificationTemplate: 'verify-event',
	},
	{
		id: 11,
		availability: ['individual'],
		labelID: 'games-journalist',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbatdcme6c2n',
		locales: [
			{
				displayName: 'Games Journalist',
				lang: 'en',
			},
		],
		requiresVerification: true,
		verificationTemplate: 'verify-journalist',
	},
	{
		id: 12,
		availability: ['organization'],
		labelID: 'games-publication',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbatc77g672z',
		locales: [
			{
				displayName: 'Games Publication',
				lang: 'en',
			},
		],
		requiresVerification: true,
		verificationTemplate: 'verify-publication',
	},
	{
		id: 13,
		availability: ['organization'],
		labelID: 'games-publisher',
		listUri: 'at://did:plc:dsae6lz5garrdkbicuor4chs/app.bsky.graph.list/3lbatb4cb7c2n',
		locales: [
			{
				displayName: 'Games Publisher',
				lang: 'en',
			},
		],
		requiresVerification: true,
		verificationTemplate: 'verify-publisher',
	},
]
