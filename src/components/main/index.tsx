import 'twin.macro'
import { Card } from 'components'
import { ApplicantList } from 'containers'

import * as S from './styles'

const Main = () => {
  return (
    <S.Container>
      <div tw="py-5">
        <h1 tw="text-lg leading-3 font-medium text-gray-900">
          Brazilians Work Permit - Process Time
        </h1>
        <h2 tw="mt-1 max-w-2xl text-sm text-gray-500">
          Details and application.
        </h2>
      </div>
      <div tw="flex items-center justify-center mb-4 space-x-4">
        <Card
          title="IRCC"
          content="23 weeks"
          footer="Last update: 27/08/2021"
          variant="gray"
        />
        <Card
          title="Longest waiting"
          content="89 weeks"
          footer="Last update: 27/08/2021"
        />
        <Card
          title="shorter waiting"
          content="1 week"
          footer="Last update: 27/08/2021"
          variant="skyBlue"
        />
      </div>
      <ApplicantList />
    </S.Container>
  )
}

export default Main
