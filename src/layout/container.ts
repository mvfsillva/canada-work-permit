import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Container = styled.div`
  ${({ theme }) => css`
    max-width: ${theme.grid.container};
    min-height: 100vh;
    padding: ${theme.spaces.xxxsmall} calc(${theme.grid.gutter} / 2);
    margin: 0 auto;
    background-color: ${theme.colors.white};

    ${media.greaterThan('medium')`
      max-width: 100vw;
      padding: ${theme.spaces.small} calc(${theme.grid.gutter} / 2);
    `}
  `}
`
