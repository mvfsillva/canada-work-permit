import * as S from './styles'

export type VariantTypes =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'noBorder'
  | 'skyBlue'

type CardProps = {
  title: string
  content: string
  footer?: React.ReactNode
  variant?: VariantTypes
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  footer,
  variant = 'primary'
}) => {
  return (
    <S.Card variant={variant} data-testid="card">
      <S.Title>{title}</S.Title>
      <S.Content>{content}</S.Content>
      <S.Footer>{footer}</S.Footer>
    </S.Card>
  )
}

export default Card
