import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.header`
  ${({ theme }) => css`
    text-align: center;
    padding-bottom: ${theme.spaces.small};
    display: flex;
    align-item: center;
    flex-direction: column;
    justify-content: space-between;

    h1 {
      font-size: ${theme.font.sizes.medium};
    }

    h2 {
      font-size: ${theme.font.sizes.small};
    }

    ${media.greaterThan('medium')`
      text-align: center;
      margin: auto;
    `}
  `}
`
