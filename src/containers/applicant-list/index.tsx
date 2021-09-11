import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useCopyToClipboard } from 'react-use'
import { useList } from 'react-firebase-hooks/database'
import { toast } from 'react-toastify'

import { Button } from 'components'
import { pluralize, generateApprovedList } from 'helpers'
import { firebase } from 'services'
import { Box } from 'layout'

import { TableHead, TableItem } from './table-partials'

const Section = tw.section`py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8`
const ButtonContainer = tw.div`sm:mt-0 md:grid md:grid-cols-3 md:gap-6 mb-4 sm:w-full lg:w-6/12`

export default function ApplicantList() {
  const router = useRouter()
  const [applications, isLoading, error] = useList(
    firebase.ref('/applications')
  )

  const [, copyToClipboard] = useCopyToClipboard()
  const [shareCompleteList, shareNocList] = generateApprovedList(applications)

  if (isLoading) return <Box>Loading...</Box>
  if (error) return <Box>An error has occurred</Box>

  applications.sort(
    (a, b) =>
      +new Date(b.val().application_date) - +new Date(a.val().application_date)
  )

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
      <Section>
        <table tw="min-w-full divide-y divide-gray-200">
          <TableHead />
          <tbody tw="bg-white divide-y divide-gray-200">
            {applications.map((person) => (
              <tr
                tw="cursor-pointer hover:bg-gray-300"
                key={person.key}
                onClick={() => router.push(`/applicant/edit/${person.key}`)}
              >
                <TableItem
                  item={person.val().name}
                  subItem={person.val().noc}
                />
                <TableItem item={person.val().application_date} />
                <TableItem item={person.val().application_year} />
                <TableItem
                  item={
                    +person.val().date_processing_week > 0
                      ? pluralize(+person.val().date_processing_week, 'week')
                      : 'less than 1 week'
                  }
                />
                <TableItem status={person.val().status} />
                <TableItem item={person.val().visa_response_date} />
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  )
}
