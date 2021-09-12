import 'twin.macro'
import { Accordion } from 'components'
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
}

const Filter = ({ handleFilter }: FilterProps) => {
  return (
    <section tw="border-2 mb-4 p-4 border-gray-600 overflow-hidden">
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
      </Accordion>
    </section>
  )
}

export default Filter
