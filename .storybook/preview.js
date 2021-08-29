import { ThemeProvider } from 'styled-components'
import { RouterContext } from "next/dist/shared/lib/router-context";
import GlobalStyle from '../src/styles/global-styles'
import theme from '../src/styles/theme'

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  }
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  )
]
