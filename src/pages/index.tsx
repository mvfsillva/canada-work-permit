import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'twin.macro'

import { Main } from 'components'

const Home = () => (
  <>
    <Main />
    <ToastContainer containerId="toastify" draggable={false} />
  </>
)

export default Home
