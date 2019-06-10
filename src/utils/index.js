const Ramda = require("ramda");
const moment = require("moment");
const timeToEnd = parseInt(process.env.TIME_TO_FINISH);
const intervalIteration = parseInt(process.env.INTERVAL_TIMER);

const logger = value => {
	console.log("time", value);
};

const finishProcessWithTime = responce => time => {
	const actualDate = timeTransformer(new Date());

	console.log("finished", time, new Date());
	responce.end(`stopped time ${time} ,actual time ${actualDate}`);
};

const timeTransformer = timeInMs =>
	moment.utc(timeInMs).format("Y-MM-DD HH:mm:ss");

module.exports.makeTimer = responce => {
	const now = new Date();
	const initialTime = now.getTime();
	const finishTime = initialTime + timeToEnd;
	let iterableTime = initialTime;

	const timerId = setInterval(() => {
		iterableTime = iterableTime + intervalIteration;

		Ramda.compose(
			logger,
			timeTransformer
		)(iterableTime);
	}, intervalIteration);

	setTimeout(function() {
		clearInterval(timerId);
		Ramda.compose(
			finishProcessWithTime(responce),
			timeTransformer
		)(finishTime);
	}, timeToEnd);
};
