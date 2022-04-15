import { formatDate } from 'components/date-field'
import { isToday } from 'date-fns'
import { convertStringToDate } from 'helpers'
import type {
  ApplicationType,
  ConvertStringToDateProps,
  StatusTypes
} from 'types'

const convertToApplicationType = (
  person: ConvertStringToDateProps
): ApplicationType => {
  const startDate = convertStringToDate(person.application_date)
  const status: StatusTypes =
    isToday(startDate) || !person?.status?.value
      ? 'awaiting'
      : person.status.value

  return {
    application_date: person.application_date,
    application_year: +person.application_date.split('-')[0],
    category: person.category.value || person.category,
    name: person.name,
    noc: person.noc,
    status,
    visa_response_date:
      person.status.value === 'approved' && !person.visa_response_date
        ? formatDate(new Date())
        : person.visa_response_date,
    visa_type: person.visa_type.value || person.visa_type
  }
}

export default convertToApplicationType
