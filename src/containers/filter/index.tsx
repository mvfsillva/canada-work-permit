import 'twin.macro'
import { Accordion, Input } from 'components'
import {
  visaTypeOptions,
  categoryOptions,
  statusOptions,
  yearOptions
} from './options'

import { FilterField } from './partials'

type FilterProps = {
  handleFilter?(event: { target: { name: string; value: string } }): void
  handleClear?: () => void
  handleSearch?({ target: { value } }): string
}

const Filter = ({ handleFilter, handleSearch }: FilterProps) => {
  return (
    <section tw="border-2 mb-4 border-gray-600 overflow-hidden rounded-md">
      <Accordion title="Filters">
        <div tw="my-px px-2 w-full overflow-hidden md:my-1 md:px-1 md:w-full lg:my-2 lg:px-2 lg:w-2/4 xl:my-2 xl:px-2 xl:w-1/2 pb-2">
          <Input
            name="search"
            type="search"
            placeholder="Search by name or NOC"
            onChange={handleSearch}
          />
        </div>
        <div tw="flex flex-wrap -mx-px overflow-hidden items-center">
          <FilterField
            name="category"
            label="Category"
            options={categoryOptions}
            onChange={handleFilter}
          />
          <FilterField
            name="visa_type"
            label="Visa Type"
            options={visaTypeOptions}
            onChange={handleFilter}
          />
          <FilterField
            name="status"
            label="Status"
            options={statusOptions}
            onChange={handleFilter}
          />
          <FilterField
            name="application_year"
            label="Year"
            options={yearOptions}
            onChange={handleFilter}
          />
        </div>
      </Accordion>
    </section>
  )
}

export default Filter
