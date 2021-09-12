import styled from 'styled-components'
import tw from 'twin.macro'

import type { StatusTypes } from 'types'

type StatusType = StatusTypes

type TableItemProps = {
  item?: string | number
  subItem?: string | number
  status?: StatusType | string
}

const Th = tw.th`px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`
const StatusSpan = styled.div<{ status?: StatusType | string }>(
  ({ status }) => [
    tw`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize`,
    status.toLowerCase() === 'approved' && tw`bg-green-100 text-green-800`,
    status.toLowerCase() === 'not approved' && tw`bg-red-100 text-red-800`,
    status.toLowerCase() === 'awaiting' && tw`bg-yellow-100 text-yellow-800`
  ]
)

export const TableHead = () => (
  <thead tw="bg-gray-200">
    <tr>
      <Th>Name</Th>
      <Th>Application Date</Th>
      <Th>Application Year</Th>
      <Th>Processing Time</Th>
      <Th>Status</Th>
      <Th>Date Processed</Th>
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
