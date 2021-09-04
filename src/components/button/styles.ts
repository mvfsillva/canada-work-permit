import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { darken } from 'polished'

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
  disabled: (theme) => css`
    background-color: ${theme.colors.muted};
    cursor: not-allowed;
    &:hover {
      background: ${darken(0.1, theme.colors.muted)};
    }
  `
}

export const ButtonWrapper = styled.button<{ variant?: VariantTypes; disabled?: boolean }>`
  ${({ theme, variant, disabled }) => css`
    background-color: ${theme.colors.gray};
    border-radius: ${theme.border.radius};
    color: ${theme.colors.white};
    padding: 1rem ${theme.spaces.small};
    font-size: ${theme.font.sizes.base};
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    transition: ${theme.transition.ease};

    ${variant === 'rounded' && modifiers.rounded(theme)};
    ${variant === 'circle' && modifiers.circle(theme)};
    ${variant === 'primary' && modifiers.primary(theme)};
    ${variant === 'secondary' && modifiers.secondary(theme)};
    ${variant === 'skyBlue' && modifiers.skyBlue(theme)};
    ${disabled && modifiers.disabled(theme)};
  `}
`
