import moment from "moment-timezone";

const msToMinutesAndHour = (ms: number): string => {
	const hours = Math.floor(ms / 60 / 60000);
	const minutes = Math.floor((ms / (1000 * 60)) % 60);
	const seconds = Math.floor((ms / 1000) % 60);

	const hoursString = hours >= 10 ? hours : "0" + hours;
	const minutesString = minutes >= 10 ? minutes : "0" + minutes;
	const secondsString = seconds >= 10 ? seconds : "0" + seconds;

	return `${hoursString} hours(s) ${minutesString} minute(s) ${secondsString} seconds(s)`;
};

export const get = (): moment.Moment => moment().utc().tz(moment.tz.guess());

export const elapsedTime = (startTime: number, endTime: number): string => {
	return msToMinutesAndHour(endTime - startTime);
};
