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
    <section tw="border-2 mb-4 p-4 sm:p-6 border-gray-600 overflow-hidden rounded-md">
      <Accordion title="Filters">
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
        <div tw="flex flex-wrap overflow-hidden items-center my-px">
          <Input
            name="search"
            type="search"
            placeholder="Search by name or NOC"
            onChange={handleSearch}
          />
        </div>
      </Accordion>
    </section>
  )
}

export default Filter
