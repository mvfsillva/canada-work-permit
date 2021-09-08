import 'twin.macro'
import { useState } from 'react'
import { useForm, FormProvider as ReactFormProvider } from 'react-hook-form'
import { Fields, Filter } from 'containers'
import { Button } from 'components'
import { create } from 'services'

import type { ApplicationType } from 'types'
import { TableHead, TableItem, TableItemEditButton } from './table-partials'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormProvider = ReactFormProvider as unknown as any

type ApplicantListProps = {
  applications: Partial<ApplicationType[]>
}

export default function ApplicantList({ applications }: ApplicantListProps) {
  const [showForm, setShowForm] = useState(false)
  const [editPerson, setEditPerson] = useState({})
  const [filter, setFilter] = useState({
    category: 'all',
    visaType: 'all',
    status: 'all'
  })
  const methods = useForm()

  console.log(methods.watch())

  const onSubmit = (data) => {
    console.log(data)
    create(data)
    methods.reset()
    setShowForm(false)
  }

  const handleEditApplication = (person: Partial<ApplicationType>) => {
    setShowForm(true)
    setEditPerson(person)
  }

  const handleFilter = ({ target }) => {
    const { name, value: item } = target
    setFilter({
      ...filter,
      [name]: item.value
    })
  }

  return (
    <div tw="flex flex-col">
      <div tw="flex items-center mb-4 space-x-4">
        <Button variant="skyBlue" onClick={() => setShowForm(true)}>
          New Applicant
        </Button>
        <Button
          variant="gray"
          onClick={() => console.log('Copy approved list')}
        >
          Copy approved list
        </Button>
      </div>
      <Filter handleFilter={handleFilter} />
      {!showForm ? (
        <div tw="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div tw="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div tw="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table tw="min-w-full divide-y divide-gray-200">
                <TableHead />
                <tbody tw="bg-white divide-y divide-gray-200">
                  {applications.map((person, index) => (
                    <tr key={index}>
                      <TableItem item={person.name} subItem={person.noc} />
                      <TableItem item={person.application_date} />
                      <TableItem item={person.application_year} />
                      <TableItem item={person.date_processing_week} />
                      <TableItem status={person.status} />
                      <TableItem item={person.visa_response_date} />
                      <TableItemEditButton
                        handleEditApplication={() =>
                          handleEditApplication(person)
                        }
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <FormProvider {...methods} defaultValues={editPerson}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Fields handleCancel={() => setShowForm(false)} />
          </form>
        </FormProvider>
      )}
    </div>
  )
}
