import React from 'react'
import { createGlobalStyle, css } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  ${({ theme }) => css`
    html {
      font-family: ${theme.font.family};
      font-size: 14px;
      scroll-behavior: smooth;
    }

    body {
      background-color: ${theme.colors.gray};
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
