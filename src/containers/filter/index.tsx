import tw from 'twin.macro'
import { Select } from 'components'

type FilterProps = {
  handleFilter?(event: { target: { name: string; value: string } }): void
}

const FilterGridItem = tw.div`my-px px-px w-full overflow-hidden sm:my-px sm:px-px md:my-1 md:px-1 md:w-1/3 lg:my-2
lg:px-2 lg:w-1/6 xl:my-2 xl:px-2 xl:w-1/6 pb-2`
const Label = tw.label`block text-sm font-medium text-gray-700 capitalize`

const visaTypeOptions = [
  { value: 'WP', label: 'WP' },
  { value: 'OWP', label: 'OWP' },
  { value: 'GTS', label: 'GTS' },
  { value: 'GTS, OWP', label: 'GTS, OWP' },
  { value: 'WP, OWP', label: 'WP, OWP' },
  { value: 'GTS, OWP, VISITOR', label: 'GTS, OWP, VISITOR' }
]

const categoryOptions = [
  { value: 'LMIA', label: 'LMIA' },
  { value: 'LMIA EXEMPT', label: 'LMIA EXEMPT' },
  { value: 'GTS', label: 'GTS' }
]

const statusOptions = [
  { value: 'awaiting', label: 'Awaiting' },
  { value: 'approved', label: 'Approved' },
  { value: 'not approved', label: 'Not approved' }
]

const Filter = ({ handleFilter }: FilterProps) => {
  return (
    <div tw="flex flex-wrap -mx-px overflow-hidden sm:-mx-px md:-mx-1 lg:-mx-2 xl:-mx-2">
      <FilterGridItem>
        <Label>Category</Label>
        <Select
          name="category"
          options={categoryOptions}
          onChange={handleFilter}
        />
      </FilterGridItem>
      <FilterGridItem>
        <Label>Visa Type</Label>
        <Select
          name="visaType"
          options={visaTypeOptions}
          onChange={handleFilter}
        />
      </FilterGridItem>
      <FilterGridItem>
        <Label>Status</Label>
        <Select name="status" options={statusOptions} onChange={handleFilter} />
      </FilterGridItem>
    </div>
  )
}

export default Filter
