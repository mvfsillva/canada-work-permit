import { differenceInWeeks, isToday } from 'date-fns'
import firebase from './firebase-config'
import { convertStringToDate } from 'helpers'

const dbRef = firebase.ref('/applications')

export const firebaseCreate = (person) => {
  const startDate = convertStringToDate(person.application_date)
  const status: string =
    isToday(startDate) || !person?.status?.value
      ? 'awaiting'
      : person.status.value

  const data = {
    application_date: person.application_date,
    application_year: person.application_date.split('-')[0],
    category: person.category.value,
    name: person.name,
    noc: person.noc,
    status,
    visa_response_date: person.visa_response_date || '',
    visa_type: person.visa_type.value
  }

  dbRef.push(data)
}

export const firebaseUpdate = (id, data) => {
  const applicantRef = firebase.ref(`/applications/${id}`)
  const payload = {
    ...data,
    category: data.category.value || data.category,
    visa_type: data.visa_type.value || data.visa_type,
    status:
      data.visa_response_date && data.status === 'awaiting'
        ? 'approved'
        : data.status.value || data.status
  }

  applicantRef.update(payload)
}
