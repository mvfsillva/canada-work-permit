import 'twin.macro'
import { Stats } from 'components'
import { ApplicantList } from 'containers'

import * as S from './styles'

const Main = () => {
  return (
    <S.Container>
      <div tw="flex items-center justify-center">
        <Stats title="IRCC Process Time" timeProcess="23 weeks" />
        <Stats title="Longest waiting date" timeProcess="89 weeks" />
        <Stats title="shorter waiting time" timeProcess="1 week" />
      </div>
      <div tw="py-5">
        <h3 tw="text-lg leading-6 font-medium text-gray-900">
          Brazilians Work Permit - Process Time
        </h3>
        <p tw="mt-1 max-w-2xl text-sm text-gray-500">
          Details and application.
        </p>
      </div>

      <ApplicantList />
    </S.Container>
  )
}

export default Main
