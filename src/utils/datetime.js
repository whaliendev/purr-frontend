import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
dayjs.locale('zh-cn');
dayjs.extend(utc);
dayjs.extend(tz);
const timeZone = dayjs.tz.guess();

export function datetimeFormat(
  datetime = new Date(),
  pattern = 'YYYY-MM-DD HH:mm'
) {
  return dayjs.utc(datetime).tz(timeZone).format(pattern);
}

export function parseDatetimeString(datetime) {
  return dayjs.utc(datetime).tz(timeZone);
}

export function timeAgo(datetime, formatString = 'YYYY/MM/DD') {
  const currentTime = new Date().getTime();
  const between = currentTime - datetime;
  const days = Math.floor(between / (24 * 3600 * 1000));
  if (days === 0) {
    const leave1 = between % (24 * 3600 * 1000);
    const hours = Math.floor(leave1 / (3600 * 1000));
    if (hours === 0) {
      const leave2 = leave1 % (3600 * 1000);
      const minutes = Math.floor(leave2 / (60 * 1000));
      if (minutes === 0) {
        const leave3 = leave2 % (60 * 1000);
        const seconds = Math.round(leave3 / 1000);
        return seconds + ' 秒前';
      }
      return minutes + ' 分钟前';
    }
    return hours + ' 小时前';
  }
  if (days < 0) return '刚刚';
  if (days < 5) {
    return days + ' 天前';
  } else {
    return dayjs(datetime).format(formatString);
  }
}
