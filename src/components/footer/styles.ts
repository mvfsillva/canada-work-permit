import styled, { css, keyframes } from 'styled-components'
import media from 'styled-media-query'

const pulse = keyframes`
  0% { transform: scale( .75 ) }
  40% { transform: scale( .75 ) }
  60% { transform: scale( 1 ) }
  80% { transform: scale( .75 ) }
  100% { transform: scale( .75 ) }
`

export const Wrapper = styled.footer`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    text-align: center;
    font-size: ${theme.font.sizes.xxxsmall};
    line-height: ${theme.font.sizes.medium};
    transition: ${theme.transition.ease};
    margin-top: ${theme.spaces.small};
    padding-bottom: ${theme.spaces.small};

    ${media.greaterThan('medium')`
      font-size: ${theme.font.sizes.xxxsmall};
      margin-top: ${theme.spaces.xxsmall};
      padding-bottom: ${theme.spaces.xxsmall};
    `}

    a {
      color: ${theme.colors.black};
      font-weight: bold;
      text-decoration: none;
      margin-left: 0.2rem;
      :hover {
        color: ${theme.colors.aqua};
      }
    }
  `}
`

export const Love = styled.span`
  ${({ theme }) => css`
    :before {
      content: '\2665';
    }
    display: inline-block;
    position: relative;
    top: 0.2rem;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    transform: scale(0.5);
    animation: ${pulse} 0.5s linear infinite alternate-reverse;
  `}
`
