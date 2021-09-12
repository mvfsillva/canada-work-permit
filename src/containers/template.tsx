import { Header, Footer } from 'components'
import { Container } from 'layout'

type Props = {
  children: React.ReactNode
}

const Template = ({ children }: Props) => (
  <Container>
    <Header />
    <main>{children}</main>
    <Footer />
  </Container>
)

export default Template
