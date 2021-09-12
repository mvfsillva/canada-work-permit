import { forwardRef } from 'react'
import * as S from './styles'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  disabled?: boolean
  hasError?: boolean
}

const Input = forwardRef(
  (props: InputProps, ref?: React.Ref<HTMLInputElement>) => {
    const { disabled, hasError, ...restProps } = props
    return (
      <S.Field
        {...restProps}
        hasError={hasError}
        disabled={disabled}
        ref={ref}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
