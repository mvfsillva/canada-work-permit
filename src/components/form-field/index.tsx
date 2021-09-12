import tw from 'twin.macro'

const Block = tw.div`col-span-6 sm:col-span-3 mb-2`
const Label = tw.label`block text-sm font-medium text-gray-700 mb-2`
const Error = tw.label`block text-sm font-medium text-red-700 h-2 mt-2`
const Required = tw.span`text-red-600 ml-1 font-black`

type Props = {
  children: React.ReactNode
  label: string
  error?: string
  isRequired?: boolean
}

const FormField = ({ children, label, error, isRequired }: Props) => {
  return (
    <Block>
      <Label>
        {label}
        {isRequired && <Required>*</Required>}
      </Label>
      {children}
      <Error>{error && `${label} is required`}</Error>
    </Block>
  )
}

export default FormField
