import { useCallback, useEffect, useState } from 'react'
import { useListVals as useListValues } from 'react-firebase-hooks/database'
import useSWR from 'swr'
import 'twin.macro'

import { firebase } from 'services'
import { pluralize } from 'helpers'

import { Card, Header } from 'components'
import { Box } from 'layout'
import { ApplicantList } from 'containers'
import * as S from './styles'

import type { ApplicationType } from 'types'

const fetcher = (url) => fetch(url).then((res) => res.json())

const NEXT_PUBLIC_IRCC_TIME = process.env.NEXT_PUBLIC_IRCC_TIME

const ERROR_MESSAGE = 'An error has occurred'

const Main = () => {
  const [values, loading, error] = useListValues<ApplicationType>(
    firebase.ref('/applications')
  )

  const [time, setTime] = useState<Record<string, number>>({
    shortest: 0,
    longest: 0
  })

  const { data: ircc, error: irccError } = useSWR(
    NEXT_PUBLIC_IRCC_TIME,
    fetcher
  )

  const getApplicationTime = useCallback(() => {
    const result = values
      .map((item) =>
        +item.date_processing_week > 0 ? +item.date_processing_week : 0.1
      )
      .filter(Boolean) as unknown as number[]

    const longest = Math.max(...result)
    const shortest = Math.min(...result)

    setTime({ longest, shortest })
  }, [values])

  useEffect(() => {
    getApplicationTime()
  }, [getApplicationTime])

  if (!ircc || loading) return <Box>Loading...</Box>
  if (error) return <Box>{ERROR_MESSAGE}</Box>

  return (
    <S.Container>
      <Header />
      <section tw="mt-10 sm:mt-0 md:grid md:grid-cols-3 md:gap-6">
        <div tw="mb-4">
          <Card
            title="IRCC"
            content={irccError ? ERROR_MESSAGE : ircc?.work?.BR}
            footer={`Last update: ${ircc?.work?.lastupdated}`}
            variant="gray"
          />
        </div>
        <div tw="mb-4">
          <Card
            title="Longest waiting"
            content={`${pluralize(time.longest, 'week')}`}
            footer="Based on our applications history"
          />
        </div>
        <div tw="mb-4">
          <Card
            title="shorter waiting"
            content={
              time.shortest > 0.1
                ? pluralize(time.shortest, 'week')
                : 'less than 1 week'
            }
            variant="skyBlue"
            footer="Based on our applications history"
          />
        </div>
      </section>
      <ApplicantList applications={values} />
    </S.Container>
  )
}

export default Main
