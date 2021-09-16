import styled, { css } from 'styled-components'

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
    border: 1px solid ${hasError ? theme.colors.primary : theme.colors.black};
    color: ${theme.colors.black};
    outline: 0;
    padding: 0.6rem;

    ::placeholder {
      color: ${theme.colors.darkGray};
    }
  `}
`
