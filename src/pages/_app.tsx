import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { I18nextProvider } from 'react-i18next'

import theme from 'styles/theme'
import GlobalStyle from 'styles/global-styles'

import i18n from 'i18n/config'

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <I18nextProvider i18n={i18n}>
      <Head>
        <meta name="theme-color" content="#EE5253" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
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
        <link rel="manifest" href="/manifest" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </I18nextProvider>
  </ThemeProvider>
)

export default App
