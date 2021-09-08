import { differenceInWeeks } from 'date-fns'
import firebase from './firebase-init'

const dbRef = firebase.ref('/applications')

export const getAll = () => {
  const data = dbRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val())
      }
      return console.log('No data available')
    })
    .catch((error) => {
      throw error
    })

  return data
}

const formatDate = (date): Date => {
  const [year, month, day] = date.split('-')

  return new Date(year, month, day)
}

export const create = (person) => {
  const finalDate = person.visa_response_date
    ? formatDate(person.visa_response_date)
    : new Date()
  const startDate = formatDate(person.application_date)
  const date_processing_week = differenceInWeeks(finalDate, startDate)
  const data = {
    application_date: person.application_date,
    application_year: person.application_date.split('-')[0],
    category: person.category.value || '',
    date_processing_week: date_processing_week,
    name: person.name || '',
    noc: person.noc || '',
    status: person.status.value || '',
    visa_response_date: person.visa_response_date || '',
    visa_type: person.visa_type || ''
  }

  dbRef.push(data)
}
export const update = (key, value) => dbRef.child(key).update(value)
export const remove = (key) => dbRef.child(key).remove()
