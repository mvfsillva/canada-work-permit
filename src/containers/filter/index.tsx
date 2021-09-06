import tw from 'twin.macro'
import { Select } from 'components'

const FilterGridItem = tw.div`my-px px-px w-full overflow-hidden sm:my-px sm:px-px md:my-1 md:px-1 md:w-1/3 lg:my-2
lg:px-2 lg:w-1/6 xl:my-2 xl:px-2 xl:w-1/6 pb-2`
const Label = tw.label`block text-sm font-medium text-gray-700`

const Filter = () => {
  return (
    <div tw="flex flex-wrap -mx-px overflow-hidden sm:-mx-px md:-mx-1 lg:-mx-2 xl:-mx-2">
      <FilterGridItem>
        <Label>Category</Label>
        <Select
          options={[
            { value: 'LMIA', label: 'LMIA' },
            { value: 'LMIA EXEMPT', label: 'LMIA EXEMPT' },
            { value: 'GTS', label: 'GTS' }
          ]}
        />
      </FilterGridItem>
      <FilterGridItem>
        <Label>Visa Type</Label>
        <Select
          options={[
            { value: 'WP', label: 'WP' },
            { value: 'OWP', label: 'OWP' },
            { value: 'GTS', label: 'GTS' },
            { value: 'GTS, OWP', label: 'GTS, OWP' },
            { value: 'WP, OWP', label: 'WP, OWP' },
            { value: 'GTS, OWP, VISITOR', label: 'GTS, OWP, VISITOR' }
          ]}
        />
      </FilterGridItem>
      <FilterGridItem>
        <Label>Status</Label>
        <Select
          options={[
            { value: 'awaiting', label: 'awaiting' },
            { value: 'approved', label: 'approved' },
            { value: 'not approved', label: 'not approved' }
          ]}
        />
      </FilterGridItem>
      <FilterGridItem>
        <Label>Year</Label>
        <Select
          options={[
            { value: '2019', label: '2019' },
            { value: '2020', label: '2020' },
            { value: '2021', label: '2021' }
          ]}
        />
      </FilterGridItem>
    </div>
  )
}

export default Filter
