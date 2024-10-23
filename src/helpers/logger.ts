// Variables
let currentDepth = 0





function error(...args: any[]) {
	const prefix = Array(currentDepth).fill('\t').join('')

	console.error(prefix, ...args)
}

function log(...args: any[]) {
	const prefix = Array(currentDepth).fill('\t').join('')

	console.log(prefix, ...args)
}

function group(...args: any[]) {
	log(...args)

	currentDepth += 1
}

function groupEnd() {
	currentDepth -= 1

	if (currentDepth < 0) {
		currentDepth = 0
	}
}

export const logger = {
	error,
	group,
	groupEnd,
	log,
}
