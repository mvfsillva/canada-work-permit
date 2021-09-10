import 'twin.macro'
import { useRouter } from 'next/router'
import { useCopyToClipboard } from 'react-use'
import { Button } from 'components'
import { pluralize } from 'helpers'

import type { ApplicationType } from 'types'
import { TableHead, TableItem } from './table-partials'

type ApplicantListProps = {
  applications: Partial<ApplicationType[]>
}

export default function ApplicantList({ applications }: ApplicantListProps) {
  const router = useRouter()
  const [, copyToClipboard] = useCopyToClipboard()

  let approvedList = ''
  let approvedNocList = ''

  applications.forEach((item) => {
    const dateProcessingWeek =
      +item.date_processing_week > 0
        ? pluralize(+item.date_processing_week, 'week')
        : 'less than 1 week'

    if (item.status === 'approved') {
      approvedList += `${item.name} | ${item.noc} | ${item.application_date} | ${item.visa_type} | ${item.category} | ${item.visa_response_date} | ${dateProcessingWeek}\n`
    }

    if (
      item.status === 'approved' &&
      !approvedNocList
        .replaceAll(' ✅', '')
        .trim()
        .split('\n')
        .includes(`${item.noc}`)
    ) {
      approvedNocList += `${item.noc} ✅ \n`
    }
  })

  return (
    <div tw="flex flex-col">
      <div tw="sm:mt-0 md:grid md:grid-cols-3 md:gap-6 mb-4 sm:w-full lg:w-6/12">
        <Button variant="black" onClick={() => router.push('/new-applicant')}>
          New Applicant
        </Button>
        <Button variant="skyBlue" onClick={() => copyToClipboard(approvedList)}>
          Copy approved list
        </Button>
        <Button variant="aqua" onClick={() => copyToClipboard(approvedNocList)}>
          Copy approved Noc List
        </Button>
      </div>
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
                {/* <TableItemEditButton /> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
