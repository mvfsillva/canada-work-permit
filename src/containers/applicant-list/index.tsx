import 'twin.macro'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useCopyToClipboard } from 'react-use'
import { Filter } from 'containers'
import { Button } from 'components'
import { pluralize } from 'helpers'

import type { ApplicationType } from 'types'
import { TableHead, TableItem, TableItemEditButton } from './table-partials'

type ApplicantListProps = {
  applications: Partial<ApplicationType[]>
}

export default function ApplicantList({ applications }: ApplicantListProps) {
  const router = useRouter()
  const [, copyToClipboard] = useCopyToClipboard()
  const [filter, setFilter] = useState({
    category: 'all',
    visaType: 'all',
    status: 'all'
  })

  const handleFilter = ({ target }) => {
    const { name, value: item } = target
    setFilter({
      ...filter,
      [name]: item.value
    })
  }

  let approvedList = ''
  applications.forEach((item) => {
    const dateProcessingWeek =
      +item.date_processing_week > 0
        ? pluralize(+item.date_processing_week, 'week')
        : 'less than 1 week'
    if (item.status === 'approved') {
      approvedList += `${item.name} | ${item.noc} | ${item.application_date} | ${item.visa_type} | ${item.category} | ${item.visa_response_date} | ${dateProcessingWeek}\n`
    }
  })

  return (
    <div tw="flex flex-col">
      <div tw="flex items-center mb-4 space-x-4">
        <Button variant="skyBlue" onClick={() => router.push('/new-applicant')}>
          New Applicant
        </Button>
        <Button variant="gray" onClick={() => copyToClipboard(approvedList)}>
          Copy approved list
        </Button>
      </div>
      <Filter handleFilter={handleFilter} />
      <div tw="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <table tw="min-w-full divide-y divide-gray-200">
          <TableHead />
          <tbody tw="bg-white divide-y divide-gray-200">
            {applications.map((person, index) => (
              <tr key={index}>
                <TableItem item={person.name} subItem={person.noc} />
                <TableItem item={person.application_date} />
                <TableItem item={person.application_year} />
                <TableItem
                  item={
                    +person.date_processing_week > 0
                      ? pluralize(+person.date_processing_week, 'week')
                      : 'less than 1 week'
                  }
                />
                <TableItem status={person.status} />
                <TableItem item={person.visa_response_date} />
                <TableItemEditButton />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
