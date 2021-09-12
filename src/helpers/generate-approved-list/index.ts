import { pluralize } from 'helpers'

function renderDateProcessingWeek(date_processing_week) {
  return date_processing_week > 0
    ? pluralize(date_processing_week, 'week')
    : 'less than 1 week'
}

const generateApprovedList = (list) => {
  let shareCompleteList = ''
  let shareNocList = ''

  list.sort(
    (a, b) =>
      +new Date(b.val().visa_response_date) -
      +new Date(a.val().visa_response_date)
  )

  list.forEach((item) => {
    const dateProcessingWeek = renderDateProcessingWeek(
      item.val().date_processing_week
    )

    if (item.val().status === 'approved') {
      shareCompleteList += `${item.val().name} | ${item.val().noc} | ${
        item.val().application_date
      } | ${item.val().visa_type} | ${item.val().category} | ${
        item.val().visa_response_date
      } | ${dateProcessingWeek}\n`

      shareNocList += `${item.val().name} ${item.val().noc} ✅ \n`
    }
  })

  return [shareCompleteList, shareNocList]
}

export default generateApprovedList
