const generateApprovedList = (list): Array<string | number> => {
  let shareCompleteList = 'Lista de aprovados\n'
  let shareNocList = ''
  let totalApproved = 0

  list.sort(
    (a, b) => +new Date(b.visa_response_date) - +new Date(a.visa_response_date)
  )

  list.forEach((item) => {
    if (item.status === 'approved') {
      totalApproved += 1
      shareCompleteList += `${item.name} | ${item.noc} | ${item.application_date} | ${item.visa_type} | ${item.category} | ${item.visa_response_date}\n`

      if (item.noc !== '0000') {
        shareNocList += `${item.name} ${item.noc} ✅ \n`
      }
    }
  })

  return [shareCompleteList, shareNocList, totalApproved]
}

export default generateApprovedList
