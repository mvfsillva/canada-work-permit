import 'twin.macro'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'

import { Card } from 'components'
import { Template, ApplicantList } from 'containers'
import { Box } from 'layout'
import { pluralize } from 'helpers'
import { useSupabase } from 'services/useSupabase'

import type { ApplicationType } from 'types'

const fetcher = (url) => fetch(url).then((res) => res.json())

const NEXT_PUBLIC_IRCC_TIME = process.env.NEXT_PUBLIC_IRCC_TIME
const ERROR_MESSAGE = 'An error has occurred'

const Home = () => {
  const { data, loading, error, get } =
    useSupabase<ApplicationType>('applications')
  const [time, setTime] = useState<Record<string, number>>({
    shortest: 0,
    longest: 0
  })

  const { data: ircc, error: irccError } = useSWR(
    NEXT_PUBLIC_IRCC_TIME,
    fetcher
  )

  // @TODO: Fix Longest/shortest waiting from new database;
  const getApplicationTime = useCallback(() => {
    const result = data
      .map((item) =>
        +item.date_processing_week > 0 ? +item.date_processing_week : 0.1
      )
      .filter(Boolean) as unknown as number[]

    const longest = Math.max(...result)
    const shortest = Math.min(...result)

    setTime({ longest, shortest })
  }, [data])

  useEffect(() => {
    getApplicationTime()
  }, [getApplicationTime])

  useEffect(() => {
    get()
  }, [get])

  if (!ircc || loading) return <Box>Loading...</Box>
  if (error) return <Box>{ERROR_MESSAGE}</Box>

  return (
    <Template>
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
            title="Shortest waiting"
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
      <ApplicantList />
    </Template>
  )
}

export default Home
