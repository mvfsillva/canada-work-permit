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
    border: 1px solid ${hasError ? theme.colors.primary : theme.colors.black};
    color: ${theme.colors.black};
    padding: 0.6rem;
    outline-color: transparent;
    ::placeholder {
      color: ${theme.colors.darkGray};
    }
  `}
`
