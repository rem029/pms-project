import moment from "moment-timezone";

const msToMinutesAndHour = (ms: number) => {
  let hours = Math.floor(ms / 60 / 60000);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let seconds = Math.floor((ms / 1000) % 60);

  let hoursString = hours >= 10 ? hours : '0' + hours;
  let minutesString = minutes >= 10 ? minutes : '0' + minutes;
  let secondsString = seconds >= 10 ? seconds : '0' + seconds;

  return `${hoursString} hours(s) ${minutesString} minute(s) ${secondsString} seconds(s)`;
};

export const get = () => moment().utc().tz(moment.tz.guess()) ;

export const elapsedTime =  (startDateTimeString: string, endDateTimeString: string) => {
  let start = new Date(startDateTimeString) ;
  let end = new Date(endDateTimeString) ;
  return msToMinutesAndHour(end.getTime() - start.getTime());
}
