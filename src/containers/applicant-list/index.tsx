import { memo, useState, useEffect, useCallback, useMemo } from 'react'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useCopyToClipboard } from 'react-use'
import { useList } from 'react-firebase-hooks/database'
import { toast } from 'react-toastify'

import { Button } from 'components'
import { Filter } from 'containers'
import { generateApprovedList, differenceDateWeek } from 'helpers'
import { useDebounce } from 'hooks'
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
  const [, copyToClipboard] = useCopyToClipboard()
  const [applications, isLoading, error] = useList(
    firebase.ref('/applications')
  )

  const [filter, setFilter] = useState<FilterTypes | undefined>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([])
  const [shareCompleteList, shareNocList, totalApproved] =
    generateApprovedList(applications)
  const debouncedSearch = useDebounce(searchTerm, 1000)

  applications.sort((a, b) => {
    let sortKey = 'application_date';

    if (filter?.status?.includes('approved') || filter?.status?.includes('not approved')) sortKey = 'visa_response_date';

    return +new Date(b.val()[sortKey]) - +new Date(a.val()[sortKey])
  });

  const handleFilter = ({ target }) => {
    const { name, value: item } = target
    const values = item.map(({ value }) => {
      return value
    })

    setFilter({ ...filter, [name]: values })
  }

  const filteredApplications = useMemo(() => {
    const filterKeys = Object.keys(filter)
    if (!filterKeys?.length) return applications

    return applications.filter((application) => {
      return filterKeys.every((key) => {
        if (!filter[key]?.length) return delete filter[key]

        if (Array.isArray(application.val()[key])) {
          return application
            .val()
            [key].some((item) => filter[key].includes(item))
        }

        return filter[key].includes(application.val()[key])
      })
    })
  }, [applications, filter])

  const searchData = useMemo(() => {
    if (debouncedSearch === '') return []

    const foundItems = data.filter((item) => {
      const value = Number.isInteger(Number(debouncedSearch))
        ? item.val().noc
        : item.val().name.toLowerCase()

      if (value.includes((debouncedSearch as string).toLowerCase())) {
        return item
      }
    })

    return foundItems
  }, [data, debouncedSearch])

  const handleData = useCallback(() => {
    setData(filteredApplications)
  }, [filteredApplications])

  const applicationData = useMemo(() => {
    return debouncedSearch ? searchData : filteredApplications
  }, [debouncedSearch, searchData, filteredApplications])

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
            copyToClipboard(shareCompleteList as string)
            toast.info('Copied approved list')
          }}
        />

        <Button
          label="Copy approved Noc List"
          variant="aqua"
          onClick={() => {
            copyToClipboard(shareNocList as string)
            toast.info('Copied NOC approved list')
          }}
        />
      </ButtonContainer>
      <Filter
        handleFilter={handleFilter}
        handleSearch={({ target: { value } }) => setSearchTerm(value) as any}
      />
      <Section>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div tw="flex place-content-around">
            <h3 tw="text-2xl leading-6 font-medium text-gray-900 mb-4 space-x-4">
              <span>Applicants total: {applications.length}</span>
              <span>
                Approved:{' '}
                {((+totalApproved * 100) / applications.length).toFixed(2)}%
              </span>
            </h3>
          </div>
          <table tw="min-w-full divide-y divide-gray-200">
            <TableHead />
            <tbody tw="bg-white divide-y divide-gray-200">
              {!applicationData.length && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  {Object.keys(filter)?.length ? 'Nothing found' : 'No data'}
                </Box>
              )}
              {applicationData.map((person) => (
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
