const generateApprovedList = (list): Array<string | number> => {
  let shareCompleteList = 'Lista de aprovados\n'
  let shareNocList = ''
  let totalApproved = 0

  list.sort(
    (a, b) =>
      +new Date(b.val().visa_response_date) -
      +new Date(a.val().visa_response_date)
  )

  list.forEach((item) => {
    if (item.val().status === 'approved') {
      totalApproved += 1
      shareCompleteList += `${item.val().name} | ${item.val().noc} | ${
        item.val().application_date
      } | ${item.val().visa_type} | ${item.val().category} | ${
        item.val().visa_response_date
      }\n`

      if (item.val().noc !== '0000') {
        shareNocList += `${item.val().name} ${item.val().noc} ✅ \n`
      }
    }
  })

  return [shareCompleteList, shareNocList, totalApproved]
}

export default generateApprovedList
