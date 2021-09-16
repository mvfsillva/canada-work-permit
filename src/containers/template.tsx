import 'twin.macro'
import styled from 'styled-components'
import media from 'styled-media-query'

import { Header } from 'components'
import { Container } from 'layout'

type Props = {
  children: React.ReactNode
}

const Blockquote = styled.blockquote`
  width: 100%;
  margin: 0 auto 2rem;
  border: 1px solid black;
  border-radius: 4px;
  ${media.greaterThan('large')`
    width: 60vw;
  `}
`

const Template = ({ children }: Props) => (
  <Container>
    <Header />
    <Blockquote tw="p-4 italic text-gray-600 border-gray-500 mb-10">
      <p tw="font-medium text-black">
        <span tw="font-black text-lg">Disclaimer:</span> This is an UNOFFICIAL
        project and not has a relationship with the Canadian government or any
        other public agency from Canada.{' '}
        <p>
          The idea here is just to share the timeline so that we can measure and
          have a more realistic processing time scenario to work permit visas.
          <br />
          <span tw="font-black text-lg">This project is not for profit!</span>
          <br />I am not responsible for long deadlines, or any problem in its
          application! For more details look at the official website!
        </p>
      </p>
    </Blockquote>
    <main>{children}</main>
  </Container>
)

export default Template
