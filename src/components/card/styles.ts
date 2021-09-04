import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { darken, lighten } from 'polished'

import type { VariantTypes } from '.'

const modifiers = {
  noBorder: css`
    border-bottom: none;
  `,
  primary: (theme) => css`
    border-bottom-color: ${theme.colors.primary};
    :hover {
      border-bottom-color: ${lighten(0.2, theme.colors.primary)};
    }
  `,
  secondary: (theme) => css`
    border-bottom-color: ${theme.colors.secondary};
    :hover {
      border-bottom-color: ${lighten(0.2, theme.colors.secondary)};
    }
  `,
  skyBlue: (theme) => css`
    border-bottom-color: ${theme.colors.blue};
    :hover {
      border-bottom-color: ${darken(0.2, theme.colors.blue)};
    }
  `,
  gray: (theme) => css`
    border-bottom-color: ${theme.colors.darkGray};
    :hover {
      border-bottom-color: ${theme.colors.gray};
    }
  `,
}

export const Card = styled.div<{ variant?: VariantTypes }>`
  ${({ theme, variant }) => css `
    position: relative;
    padding: 2rem;
    width: 100%;
    box-shadow: 0 0 5px 0px ${theme.colors.muted};

    transition: border-bottom ${theme.transition.ease};
    border-radius: ${theme.border.radius};
    border-bottom: 4px solid;

    ${variant === 'noBorder' && modifiers.noBorder};
    ${variant === 'primary' && modifiers.primary(theme)};
    ${variant === 'secondary' && modifiers.secondary(theme)};
    ${variant === 'skyBlue' && modifiers.skyBlue(theme)};
    ${variant === 'gray' && modifiers.gray(theme)};
  `}
`

export const Title = styled.h1`
  ${({ theme }) => css `
    font-size: ${theme.font.sizes.small};
    ${media.greaterThan('medium')`
      font-size: 1.3rem ${theme.font.sizes.large};
    `}
  `}
`

export const Content = styled.p`
  ${({ theme }) => css`
    margin: 1.4rem auto;
    font-size: ${theme.font.sizes.small};
    ${media.greaterThan('medium')`
      font-size: 1.3rem ${theme.font.sizes.medium};
    `}
  `}
`

export const Footer = styled.footer`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-size: ${theme.font.sizes.xsmall};
    ${media.greaterThan('medium')`
      font-size: 1.3rem ${theme.font.sizes.xmedium};
    `}
  `}
`
