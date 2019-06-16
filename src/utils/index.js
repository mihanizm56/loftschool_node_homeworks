const Ramda = require("ramda");
const timeToEnd = parseInt(process.env.TIME_TO_FINISH);
const intervalIteration = parseInt(process.env.INTERVAL_TIMER);

const logger = value => {
	console.log("timer", value);
};

const timeTransformer = timeInMs => new Date(timeInMs).toUTCString()

module.exports.makeTimer = response => {
	const now = new Date();
	const initialTime = now.getTime();
	const finishTime = initialTime + timeToEnd;
	const iterableTime = initialTime + intervalIteration;
	let deltaTime = finishTime - initialTime

	const timerId = setInterval(() => {
		deltaTime = deltaTime - intervalIteration
		
		if(!deltaTime) {
			console.log('stop the interval')
			return clearInterval(timerId);
		}

		Ramda.compose(
			logger,
			timeTransformer
		)(iterableTime);
	}, intervalIteration);

	response.end(`actual time ${new Date().toUTCString()}`);
};
