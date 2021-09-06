import styled, { css } from 'styled-components'
import { rgba } from 'polished'

export const Field = styled.input<{
  disabled?: boolean
  icon?: React.ReactElement
}>`
  ${({ theme, disabled }) => css`
    width: 100%;
    min-height: 36px;
    background-color: ${disabled && theme.colors.muted};
    border-radius: ${theme.border.radius};
    border: 1px solid ${rgba(theme.colors.muted, 1)};
    outline: 0;
    padding: 0.6rem;

    :hover {
      box-shadow: 0 0 0 2px ${rgba(theme.colors.gray, 0.3)};
    }

    :focus,
    :active {
      box-shadow: 0 0 0 2px ${rgba(theme.colors.gray, 0.3)};
    }
  `}
`
