import { memo, useState, useEffect, useCallback, useMemo } from 'react'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useCopyToClipboard } from 'react-use'
import { useList } from 'react-firebase-hooks/database'
import { toast } from 'react-toastify'

import { Button } from 'components'
import { Filter } from 'containers'
import { generateApprovedList, differenceDateWeek } from 'helpers'
import { firebase } from 'services'
import { Box } from 'layout'

import { TableHead, TableItem } from './table-partials'

const Section = tw.section`py-2 align-middle inline-block min-w-full sm:px-6 lg:px-4 overflow-x-auto sm:-mx-6`
const ButtonContainer = tw.div`sm:mt-0 md:grid md:grid-cols-3 md:gap-6 mb-4 sm:w-full lg:w-6/12`

type FilterTypes = {
  [key: string]: Record<string, any>
}

function ApplicantList() {
  const router = useRouter()
  const [applications, isLoading, error] = useList(
    firebase.ref('/applications')
  )
  const [filter, setFilter] = useState<FilterTypes | undefined>({})
  const [data, setData] = useState([])

  const [, copyToClipboard] = useCopyToClipboard()
  const [shareCompleteList, shareNocList] = generateApprovedList(applications)

  const handleFilter = ({ target }) => {
    const { name, value: item } = target
    const values = item.map(({ value }) => {
      return value
    })

    setFilter({ ...filter, [name]: values })
  }

  applications.sort(
    (a, b) =>
      +new Date(b.val().application_date) - +new Date(a.val().application_date)
  )

  const filteredApplications = useMemo(() => {
    const filterKeys = Object.keys(filter)
    if (!filterKeys?.length) return applications

    return applications.filter((application) => {
      return filterKeys.every((key) => {
        if (!filter[key]?.length) {
          return delete filter[key]
        }

        if (Array.isArray(application.val()[key])) {
          return application
            .val()
            [key].some((item) => filter[key].includes(item))
        }

        return filter[key].includes(application.val()[key])
      })
    })
  }, [applications, filter])

  const handleData = useCallback(() => {
    setData(filteredApplications)
  }, [filteredApplications])

  useEffect(() => {
    handleData()
  }, [handleData])

  if (isLoading) return <Box>Loading...</Box>
  if (error) return <Box>An error has occurred</Box>

  return (
    <div tw="flex flex-col">
      <ButtonContainer>
        <Button
          label="New Applicant"
          variant="black"
          onClick={() => router.push('/applicant/new')}
        />

        <Button
          label="Copy approved list"
          variant="skyBlue"
          onClick={() => {
            copyToClipboard(shareCompleteList)
            toast.info('Copied approved list')
          }}
        />

        <Button
          label="Copy approved Noc List"
          variant="aqua"
          onClick={() => {
            copyToClipboard(shareNocList)
            toast.info('Copied NOC approved list')
          }}
        />
      </ButtonContainer>
      <Filter handleFilter={handleFilter} />
      <Section>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table tw="min-w-full divide-y divide-gray-200">
            <TableHead />
            <tbody tw="bg-white divide-y divide-gray-200">
              {!data.length && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  {Object.keys(filter)?.length ? 'Nothing found' : 'No data'}
                </Box>
              )}
              {data.map((person) => (
                <tr
                  tw="cursor-pointer hover:bg-gray-100"
                  key={person.key}
                  onClick={() => router.push(`/applicant/edit/${person.key}`)}
                >
                  <TableItem
                    item={person.val().name}
                    subItem={person.val().noc}
                    subItemLabel="NOC"
                  />
                  <TableItem item={person.val().application_date} />
                  <TableItem
                    item={differenceDateWeek({
                      start: person.val().application_date,
                      final: person.val().visa_response_date
                    })}
                  />
                  <TableItem item={person.val()?.visa_type} />
                  <TableItem item={person.val()?.category} />
                  <TableItem status={person.val().status} />
                  <TableItem item={person.val().visa_response_date} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}

export default memo(ApplicantList)
