import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Form } from 'containers'
import 'twin.macro'
import type { SubmitHandler } from 'react-hook-form'
import { Filter } from 'containers'
import { Button } from 'components'
import {
  TableHead,
  TableItem,
  TableItemEditButton,
} from './table-partials'

const people = [
  {
    name: 'Jane Cooper',
    noc: 2174,
    application_date: '2021-05-19',
    application_year: 2021,
    visa_type: 'WP',
    status: 'approved',
    category: 'LMIA',
    visa_response_date: '2021-08-27',
    date_processing_week: '15.71 weeks'
  },
  {
    name: 'Jane Cooper',
    noc: 2174,
    application_date: '2021-05-19',
    application_year: 2021,
    visa_type: 'WP',
    status: 'approved',
    category: 'LMIA',
    visa_response_date: '2021-08-27',
    date_processing_week: '15.71 weeks'
  },
  {
    name: 'Jane Cooper',
    noc: 2174,
    application_date: '2021-05-19',
    application_year: 2021,
    visa_type: 'WP',
    status: 'approved',
    category: 'LMIA',
    visa_response_date: '2021-08-27',
    date_processing_week: '15.71 weeks'
  },
  {
    name: 'Jane Cooper',
    noc: 2174,
    application_date: '2021-05-19',
    application_year: 2021,
    visa_type: 'WP',
    status: 'approved',
    category: 'LMIA',
    visa_response_date: '2021-08-27',
    date_processing_week: '15.71 weeks'
  },
  {
    name: 'Jane Cooper',
    noc: 2174,
    application_date: '2021-05-19',
    application_year: 2021,
    visa_type: 'WP',
    status: 'approved',
    category: 'LMIA',
    visa_response_date: '2021-08-27',
    date_processing_week: '15.71 weeks'
  },
  {
    name: 'Jane Cooper',
    noc: 2174,
    application_date: '2021-05-19',
    application_year: 2021,
    visa_type: 'OWP',
    status: 'approved',
    category: 'GTS',
    visa_response_date: '2021-08-27',
    approved: 'No',
    date_processing_week: '15.71 weeks'
  },
  {
    name: 'Jane Cooper',
    noc: 2174,
    application_date: '2021-05-19',
    application_year: 2021,
    visa_type: 'OWP',
    status: 'not approved',
    category: 'GTS',
    visa_response_date: '2021-08-27',
    approved: 'No',
    date_processing_week: '15.71 weeks'
  },
  {
    name: 'Jane Cooper',
    noc: 2174,
    application_date: '2021-05-19',
    application_year: 2021,
    visa_type: 'OWP',
    status: 'awaiting',
    category: 'GTS',
    date_processing_week: '15.71 weeks',
    visa_response_date: null
  }
]

export default function ApplicantList() {
  const [showForm, setShowForm] = useState(false)
  const [editPerson, setEditPerson] = useState({})
  const methods = useForm<any>()
  const onSubmit: SubmitHandler<any> = (data) => console.log('data', data)

  const handleEditApplication = (person: any) => {
    setShowForm(true)
    setEditPerson(person)
  }

  const handleSave = () => {
    setShowForm(false)
    methods.handleSubmit(onSubmit)
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
      <Filter />
      {!showForm ? (
        <div tw="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div tw="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div tw="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table tw="min-w-full divide-y divide-gray-200">
                <TableHead />
                <tbody tw="bg-white divide-y divide-gray-200">
                  {people.map((person, index) => (
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
          <Form onSubmit={handleSave} handleCancel={() => setShowForm(false)} />
        </FormProvider>
      )}
    </div>
  )
}
