import * as S from './styles'

export type VariantTypes =
  | 'primary'
  | 'secondary'
  | 'skyBlue'
  | 'gray'
  | 'black'
  | 'aqua'
type Props = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  variant?: VariantTypes
}

const Button: React.FC<Props> = ({
  children,
  variant,
  disabled = false,
  type = 'button',
  onClick
}) => (
  <S.ButtonWrapper
    variant={variant}
    onClick={onClick}
    data-testid="button"
    type={type}
    disabled={disabled}
  >
    {children}
  </S.ButtonWrapper>
)

export default Button
