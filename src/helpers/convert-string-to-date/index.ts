const convertStringToDate = (date): Date => {
  const [year, month, day] = date.split('-')

  return new Date(year, month - 1, day)
}

export default convertStringToDate
