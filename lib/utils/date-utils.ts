import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

export const formatDate = (date: string, includeRelative = false): string => {
  const targetDate = dayjs.tz(date, 'Asia/Seoul').locale('en')
  const fullDate = targetDate.format('MMMM DD, YYYY')

  if (includeRelative) {
    return `${fullDate} (${targetDate.fromNow()})`
  }

  return fullDate
}
