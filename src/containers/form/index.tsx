import 'twin.macro'
import { useFormContext, Controller } from 'react-hook-form';
import { DateField, Input, Select } from 'components'

const statusOptions = [
  { value: 'awaiting', label: 'Awaiting' },
  { value: 'approved', label: 'Approved' },
  { value: 'not approved', label: 'Not approved' },
]

const Form = ({ data, handleSave }: any) => {
  const { setValue, register, getValues, defaultValues, control } = useFormContext();

  Object.keys(defaultValues).forEach(key => {
    setValue(key, defaultValues[key])
  })

  return (
    <section tw="mt-10 sm:mt-0 md:grid md:grid-cols-2 md:gap-6">
      <div tw="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handleSave}>
          <div tw="shadow overflow-hidden sm:rounded-md">
            <div tw="px-4 py-5 bg-white sm:p-6">
              <div tw="grid grid-cols-6 gap-6">
                <div tw="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Name (You don't need to add your last  name)
                  </label>
                  <Input
                    name="name"
                    placeholder="e.g: Drake"
                    {...register('name')}
                  />
                </div>

                <div tw="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    NOC
                  </label>
                  <Input
                    name="noc"
                    placeholder="e.g: 2175"
                    {...register('noc')}
                  />
                </div>

                <div tw="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Application Date
                  </label>
                  <DateField
                    name="application_date"
                    value={getValues('application_date')}
                    onChange={({ target: { value } }) => setValue('application_date', value)}
                    {...register('application_date')}
                  />
                </div>
                <div tw="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Visa Response Date
                  </label>
                  <DateField
                    name="visa_response_date"
                    value={getValues('visa_response_date')}
                    onChange={({ target: { value } }) => setValue('visa_response_date', value)}
                    {...register('visa_response_date')}
                  />
                </div>

                <div tw="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Application Category (LMIA | GTS | LMIA EXEMPT)
                  </label>
                  <Select
                    control={control}
                    options={[
                      { value: 'LMIA', label: 'LMIA' },
                      { value: 'LMIA EXEMPT', label: 'LMIA EXEMPT' },
                      { value: 'GTS', label: 'GTS' },
                    ]}
                    {...register('category')}
                    onChange={value => setValue('category', value)}
                  />
                </div>

                <div tw="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Application Status (Awaiting, Approved | Not Approved)
                  </label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => {
                     return (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={item => setValue('status', item.value)}
                        options={statusOptions}
                      />
                     )
                    }}
                  />

                </div>
              </div>
            </div>
            <div tw="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                tw="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Form
