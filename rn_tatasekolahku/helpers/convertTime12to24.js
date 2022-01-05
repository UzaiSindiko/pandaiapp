export default function convertTime12to24(time12h) {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes, seconds] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  if (seconds) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}`;
  }
}
