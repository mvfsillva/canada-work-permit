import * as S from './styles'

type Props = {
  children: React.ReactNode;
  rounded?: boolean;
  circle?: boolean;
  primary?: boolean;
  secondary?: boolean;
  skyBlue?: boolean;
  onClick: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  rounded,
  circle,
  primary,
  secondary,
  skyBlue,
  disabled = false,
  type = 'button',
  onClick
}) => (
  <S.ButtonWrapper
    rounded={rounded}
    circle={circle}
    primary={primary}
    secondary={secondary}
    skyBlue={skyBlue}
    onClick={onClick}
    data-testid="button"
    type={type}
    disabled={disabled}
  >
    {children}
  </S.ButtonWrapper>
)

export default Button
