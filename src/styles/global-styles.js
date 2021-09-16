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

    input[type='color'],
    input[type='date'],
    input[type='datetime'],
    input[type='datetime-local'],
    input[type='email'],
    input[type='month'],
    input[type='number'],
    input[type='password'],
    input[type='search'],
    input[type='tel'],
    input[type='text'],
    input[type='time'],
    input[type='url'],
    input[type='week'],
    select:focus,
    textarea {
      font-size: 16px;
      border-radius: ${theme.border.radius};
      -webkit-appearance: none;
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
