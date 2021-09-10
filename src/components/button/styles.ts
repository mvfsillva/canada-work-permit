import styled, { css } from 'styled-components'
import { darken, lighten } from 'polished'

import type { VariantTypes } from '.'

const modifiers = {
  primary: (theme) => css`
    background-color: ${theme.colors.primary};
    &:hover {
      background: ${darken(0.1, theme.colors.primary)};
    }
  `,
  secondary: (theme) => css`
    background-color: ${theme.colors.secondary};
    &:hover {
      background: ${darken(0.1, theme.colors.secondary)};
    }
  `,
  skyBlue: (theme) => css`
    background-color: ${theme.colors.blue};
    &:hover {
      background: ${darken(0.1, theme.colors.blue)};
    }
  `,
  gray: (theme) => css`
    background-color: ${theme.colors.darkGray};
    &:hover {
      background: ${darken(0.1, theme.colors.gray)};
    }
  `,
  black: (theme) => css`
    background-color: ${theme.colors.black};
    &:hover {
      background: ${lighten(0.1, theme.colors.black)};
    }
  `,
  aqua: (theme) => css`
    background-color: ${theme.colors.aqua};
    &:hover {
      background: ${darken(0.1, theme.colors.aqua)};
    }
  `,
  disabled: (theme) => css`
    background-color: ${theme.colors.muted};
    cursor: not-allowed;
    &:hover {
      background: ${darken(0.1, theme.colors.muted)};
    }
  `
}

export const ButtonWrapper = styled.button<{
  variant?: VariantTypes
  disabled?: boolean
}>`
  ${({ theme, variant, disabled }) => css`
    width: 100%;
    background-color: ${theme.colors.gray};
    border-radius: ${theme.border.radius};
    color: ${theme.colors.white};
    padding: 1rem ${theme.spaces.small};
    margin: 0.2rem;
    font-size: ${theme.font.sizes.base};
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    transition: ${theme.transition.ease};

    ${variant === 'primary' && modifiers.primary(theme)};
    ${variant === 'secondary' && modifiers.secondary(theme)};
    ${variant === 'skyBlue' && modifiers.skyBlue(theme)};
    ${variant === 'gray' && modifiers.gray(theme)};
    ${variant === 'black' && modifiers.black(theme)};
    ${variant === 'aqua' && modifiers.aqua(theme)};
    ${disabled && modifiers.disabled(theme)};
  `}
`
