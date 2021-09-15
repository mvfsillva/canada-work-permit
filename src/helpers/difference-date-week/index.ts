import { differenceInWeeks, isToday } from 'date-fns'
import { convertStringToDate, pluralize } from 'helpers'

function differenceDateWeek({
  start,
  final
}: {
  start: string | Date
  final: string | Date
}) {
  const startDate = convertStringToDate(start)
  const finalDate = final ? convertStringToDate(final) : new Date()
  const difference = !isToday(startDate)
    ? differenceInWeeks(finalDate, startDate)
    : 0

  return difference > 0 ? pluralize(difference, 'week') : 'less than 1 week'
}

export default differenceDateWeek
