import styled, { css } from 'styled-components'

export const Container = styled.main`
  ${({ theme }) => css`
    padding: ${theme.spaces.medium};
    height: 100vh;
  `}
`

export const Header = styled.header`
  ${({ theme }) => css`
    padding: ${theme.spaces.medium};
    height: 100vh;
  `}
`
