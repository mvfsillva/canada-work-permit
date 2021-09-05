import React from 'react'
import { createGlobalStyle, css } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  ${({ theme }) => css`
    html {
      font-family: ${theme.font.family};
      scroll-behavior: smooth;
    }

    body {
      background-color: ${theme.colors.white};
      color: ${theme.colors.black};
      font-size: ${theme.font.sizes.base};
      ${tw`antialiased`}
    }
  `}
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles
