import { useEffect, useState } from 'react'
import useSWR from 'swr'
import 'twin.macro'

import { Card } from 'components'
import { Box } from 'layout'
import { ApplicantList } from 'containers'
import { getAll } from 'services'
import * as S from './styles'

const fetcher = (url) => fetch(url).then((res) => res.json())

const NEXT_PUBLIC_IRCC_TIME = process.env.NEXT_PUBLIC_IRCC_TIME

const Main = () => {
  const [applications, setApplications] = useState([])
  const [time, setTime] = useState<Record<string, number>>({
    shortest: 0,
    longest: 0
  })
  const { data: ircc, error } = useSWR(NEXT_PUBLIC_IRCC_TIME, fetcher, {
    onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
      if (retryCount >= 2) return
      if (error.status === 404) return

      setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 3000)
    }
  })

  const getApplications = async () => {
    const data = await getAll()
    setApplications(data)
  }

  const getLongestApplication = () => {
    const result = applications.map((item) => {
      return item.date_processing_week
    })

    const longest = Math.max(...result)
    const shortest = Math.min(...result)

    setTime({ longest, shortest })
  }

  useEffect(() => {
    getApplications()
    getLongestApplication()
  }, [])

  if (!ircc) return <Box>Loading...</Box>

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
          content={error ? 'An error has occurred' : ircc?.work?.BR}
          footer={`Last update: ${ircc?.work?.lastupdated}`}
          variant="gray"
        />
        <Card
          title="Longest waiting"
          content={`${time.longest} weeks`}
          footer="Based on our applications history"
        />
        <Card
          title="shorter waiting"
          content={`${time.shortest} weeks`}
          variant="skyBlue"
          footer="Based on our applications history"
        />
      </div>
      <ApplicantList applications={applications} />
    </S.Container>
  )
}

export default Main
