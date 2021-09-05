import { forwardRef } from 'react'
import * as S from './styles'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  disabled?: boolean
}

const Input = forwardRef(
  (props: InputProps, ref?: React.Ref<HTMLInputElement>) => {
    const { disabled, ...restProps } = props
    return (
      <S.Field {...restProps} disabled={disabled} ref={ref} />
    )
  }
)

Input.displayName = 'Input'

export default Input
