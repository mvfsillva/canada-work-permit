import styled, { css } from 'styled-components'
import { rgba } from 'polished'

export const Field = styled.input<{
  disabled?: boolean
  icon?: React.ReactElement
  hasError?: boolean
}>`
  ${({ theme, disabled, hasError }) => css`
    width: 100%;
    min-height: 36px;
    background-color: ${disabled && theme.colors.muted};
    border-radius: ${theme.border.radius};
    border: 1px solid ${hasError ? theme.colors.primary : theme.colors.muted};
    outline: 0;
    padding: 0.6rem;
  `}
`
