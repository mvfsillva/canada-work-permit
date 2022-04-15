import { memo, useState, useEffect, useCallback, useMemo } from 'react'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useCopyToClipboard } from 'react-use'
import { toast } from 'react-toastify'

import { Button } from 'components'
import { Filter } from 'containers'
import { generateApprovedList, differenceDateWeek } from 'helpers'
import { useDebounce } from 'hooks'
import { Box } from 'layout'

import { ApplicationType } from 'types'
import { useSupabase } from 'services/useSupabase'
import { TableHead, TableItem } from './table-partials'

const Section = tw.section`py-2 align-middle inline-block min-w-full sm:px-6 lg:px-4 overflow-x-auto sm:-mx-6`
const ButtonContainer = tw.div`sm:mt-0 md:grid md:grid-cols-3 md:gap-6 sm:w-full lg:w-6/12`
const DEBOUNCE_TIME = 1000

// @TODO: Refactor all ANY types
type FilterTypes = {
  [key: string]: Record<string, any>
}

function ApplicantList() {
  const router = useRouter()
  const [, copyToClipboard] = useCopyToClipboard()
  const service = useSupabase<ApplicationType>('applications')

  const [filter, setFilter] = useState<FilterTypes | undefined>({})
  const [searchTerm, setSearchTerm] = useState<string | number>()
  const [data, setData] = useState([])
  const [shareCompleteList, shareNocList, totalApproved] = generateApprovedList(
    service.data
  )
  const debouncedSearch = useDebounce(searchTerm, DEBOUNCE_TIME)

  const handleFilter = ({ target }) => {
    const { name, value: item } = target
    const values = item.map(({ value }) => {
      return value
    })

    setFilter({ ...filter, [name]: values })
  }

  const filteredApplications: ApplicationType[] = useMemo(() => {
    const filterKeys = Object.keys(filter)
    if (!filterKeys?.length) return service.data

    return service.data.filter((application) => {
      return filterKeys.every((key) => {
        if (!filter[key]?.length) return delete filter[key]

        if (Array.isArray(application[key])) {
          return application[key].some((item) => filter[key].includes(item))
        }

        if (Number.isInteger(application[key])) {
          return Number(filter[key]) === application[key]
        }

        return filter[key].includes(application[key])
      })
    })
  }, [service.data, filter])

  const searchData = useMemo(() => {
    if (debouncedSearch === '') return []

    const foundItems = data.filter((item) => {
      const value = Number.isInteger(Number(debouncedSearch))
        ? item.noc
        : item.name.toLowerCase()

      if (value.includes(debouncedSearch as string)) {
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
    service.get()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.get])

  useEffect(() => {
    handleData()
  }, [handleData])

  if (service.loading) return <Box>Loading...</Box>
  if (service.error) return <Box>An error has occurred</Box>

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
          label="Copy approved noc list"
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
              <span>Applicants total: {service.data.length}</span>
              <span>
                Approved:{' '}
                {((+totalApproved * 100) / service.data.length).toFixed(2)}%
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
                  key={person.id}
                  onClick={() => router.push(`/applicant/edit/${person.id}`)}
                >
                  <TableItem
                    item={person.name}
                    subItem={person.noc}
                    subItemLabel="NOC"
                  />
                  <TableItem item={person.application_date} />
                  <TableItem
                    item={differenceDateWeek({
                      start: person.application_date,
                      final: person.visa_response_date
                    })}
                  />
                  <TableItem item={person?.visa_type} />
                  <TableItem item={person?.category} />
                  <TableItem status={person.status} />
                  <TableItem item={person.visa_response_date} />
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
