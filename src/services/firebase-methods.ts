import { differenceInWeeks, isToday } from 'date-fns'
import firebase from './firebase-config'
import { convertStringToDate } from 'helpers'

const dbRef = firebase.ref('/applications')

export const create = (person) => {
  const finalDate = person.visa_response_date
    ? convertStringToDate(person.visa_response_date)
    : new Date()

  const startDate = convertStringToDate(person.application_date)
  const date_processing_week = isToday(startDate)
    ? 0
    : differenceInWeeks(finalDate, startDate)

  const status: string =
    isToday(startDate) || !person?.status?.value
      ? 'awaiting'
      : person.status.value

  const data = {
    application_date: person.application_date,
    application_year: person.application_date.split('-')[0],
    category: person.category.value,
    date_processing_week: date_processing_week,
    name: person.name || '',
    noc: person.noc,
    status,
    visa_response_date: person.visa_response_date || '',
    visa_type: person.visa_type.value
  }

  dbRef.push(data)
}
export const update = (key, value) => dbRef.child(key).update(value)
export const remove = (key) => dbRef.child(key).remove()