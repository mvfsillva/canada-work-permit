import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Section = styled.section`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.gray};
    border-radius: ${theme.border.radius};
    width: 100%;

    ${media.greaterThan('medium')`
      max-width: 80vw;
    `}

    ${media.greaterThan('large')`
      max-width: 60vw;
    `}
  `}
`
