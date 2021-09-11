import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useCopyToClipboard } from 'react-use'
import { useList } from 'react-firebase-hooks/database'
import { Button } from 'components'
import { pluralize } from 'helpers'
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

  if (isLoading) return <Box>Loading...</Box>
  if (error) return <Box>An error has occurred</Box>

  let approvedList = ''
  let approvedNocList = ''

  applications.forEach((item) => {
    const dateProcessingWeek =
      +item.val().date_processing_week > 0
        ? pluralize(+item.val().date_processing_week, 'week')
        : 'less than 1 week'

    if (item.val().status === 'approved') {
      approvedList += `${item.val().name} | ${item.val().noc} | ${
        item.val().application_date
      } | ${item.val().visa_type} | ${item.val().category} | ${
        item.val().visa_response_date
      } | ${dateProcessingWeek}\n`
    }

    if (
      item.val().status === 'approved' &&
      !approvedNocList
        .replaceAll(' ✅', '')
        .trim()
        .split('\n')
        .includes(`${item.val().noc}`)
    ) {
      approvedNocList += `${item.val().noc} ✅ \n`
    }
  })

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
          onClick={() => copyToClipboard(approvedList)}
        />

        <Button
          label="Copy approved Noc List"
          variant="aqua"
          onClick={() => copyToClipboard(approvedNocList)}
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
