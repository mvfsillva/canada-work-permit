import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'

import theme from 'styles/theme'
import GlobalStyle from 'styles/global-styles'
import 'react-toastify/dist/ReactToastify.css'

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Head>
      <title>Brazilians Work Permit Process Time</title>
      <meta name="theme-color" content="#C8D6E5" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="An UNOFFICIAL project to follow Brazilians work permit process time"
      />
      <link rel="apple-touch-icon" href="/icon-512.png" />
      <link rel="shortcut icon" href="/icon-512.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <GlobalStyle />
    <Component {...pageProps} />
    <ToastContainer containerId="toastify" draggable={false} />
  </ThemeProvider>
)

export default App
