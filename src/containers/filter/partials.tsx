import tw from 'twin.macro'
import { Select } from 'components'

export const FilterGridItem = tw.div`my-px px-2 w-full overflow-hidden md:my-1 md:px-1 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-2`
export const Label = tw.label`block text-sm font-medium text-gray-700 capitalize`

type FilterFieldsProps = {
  label: string
  name: string
  options: Array<Record<string, any>>
  onChange: (event: { target: { name: string; value: string } }) => void
}

export const FilterField = ({
  label,
  name,
  options,
  onChange
}: FilterFieldsProps) => (
  <FilterGridItem>
    <Label>{label}</Label>
    <Select
      name={name}
      isClearable
      isMulti
      options={options}
      onChange={onChange}
    />
  </FilterGridItem>
)
