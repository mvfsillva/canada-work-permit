import styled from 'styled-components'
import tw from 'twin.macro'
import { StatusTypes } from 'types'

type StatusType = StatusTypes

type TableItemProps = {
  item?: string | number
  subItem?: string | number
  status?: StatusType
}

const Th = tw.th`px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`
const StatusSpan = styled.div<{ status?: StatusType }>(({ status }) => [
  tw`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize`,
  status.toLowerCase() === 'approved' && tw`bg-green-100 text-green-800`,
  status.toLowerCase() === 'not approved' && tw`bg-red-100 text-red-800`,
  status.toLowerCase() === 'awaiting' && tw`bg-yellow-100 text-yellow-800`
])

export const TableHead = () => (
  <thead tw="bg-gray-200">
    <tr>
      <Th>Name</Th>
      <Th>Application Date</Th>
      <Th>Application Year</Th>
      <Th>Processing Times (Weeks)</Th>
      <Th>Status</Th>
      <Th>Date Processed</Th>
      <th tw="relative px-3 py-3">
        <span tw="sr-only">Details</span>
      </th>
      <th tw="relative px-3 py-3">
        <span tw="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
)

export const TableItem = ({ item, subItem, status }: TableItemProps) => (
  <>
    <td tw="px-3 py-4 whitespace-nowrap">
      {item && (
        <div tw="flex items-center">
          <div tw="ml-2">
            <div tw="text-sm text-gray-900">{item}</div>
            <div tw="text-sm text-gray-500">{subItem}</div>
          </div>
        </div>
      )}
      {status && <StatusSpan status={status}>{status}</StatusSpan>}
    </td>
  </>
)

export const TableItemEditButton = ({ handleEditApplication }: any) => (
  <td tw="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
    <a
      onClick={handleEditApplication}
      tw="text-indigo-600 hover:text-indigo-900 cursor-pointer"
    >
      Edit
    </a>
  </td>
)

export const TableItemDetailsButton = () => (
  <td tw="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
    <a
      onClick={() => console.log('clicked')}
      tw="text-indigo-600 hover:text-indigo-900 cursor-pointer"
    >
      Details
    </a>
  </td>
)

export const Details = () => {
  return (
    <div tw="bg-white shadow overflow-hidden sm:rounded-lg">
      <div tw="px-4 py-5 sm:px-6">
        <h3 tw="text-lg leading-6 font-medium text-gray-900">
          Applicant Information
        </h3>
        <p tw="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div tw="border-t border-gray-200">
        <dl>
          <div tw="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt tw="text-sm font-medium text-gray-500">Full name</dt>
            <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Margot Foster
            </dd>
          </div>
          <div tw="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt tw="text-sm font-medium text-gray-500">Application for</dt>
            <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Backend Developer
            </dd>
          </div>
          <div tw="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt tw="text-sm font-medium text-gray-500">Email address</dt>
            <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              margotfoster@example.com
            </dd>
          </div>
          <div tw="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt tw="text-sm font-medium text-gray-500">Salary expectation</dt>
            <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              $120,000
            </dd>
          </div>
          <div tw="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt tw="text-sm font-medium text-gray-500">About</dt>
            <dd tw="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
