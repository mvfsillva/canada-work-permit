import styled from 'styled-components'

import Card from '.'

export default {
  title: 'Components/Card',
  component: Card
}

const Section = styled.section`
  width: 100%;
  display: flex;
`

const Box = styled.div`
  width: 320px;
  margin: 5px;
`

export function Basic() {
  return (
    <Section>
      <Box>
        <Card
          title="Process Time by IRCC"
          content="23 weeks"
          footer="Last update: 27/08/2021"
        />
      </Box>
      <Box>
        <Card
          title="Process Time by Our data"
          content="38 weeks"
          footer="Last update: 27/08/2021"
          variant="secondary"
        />
      </Box>
      <Box>
        <Card
          title="Process Time by Our data"
          content="38 weeks"
          footer="Last update: 27/08/2021"
          variant="gray"
        />
      </Box>
      <Box>
        <Card
          title="Process Time by Our data"
          content="38 weeks"
          footer="Last update: 27/08/2021"
          variant="noBorder"
        />
      </Box>
      <Box>
        <Card
          title="Process Time by Our data"
          content="38 weeks"
          footer="Last update: 27/08/2021"
          variant="skyBlue"
        />
      </Box>
    </Section>
  )
}
