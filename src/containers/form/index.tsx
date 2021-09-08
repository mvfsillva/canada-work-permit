import tw from 'twin.macro'
import { useFormContext, Controller } from 'react-hook-form'
import { DateField, Input, Select, Button } from 'components'
import { useRouter } from 'next/router'
import type { VisaTypes, CategoryTypes, StatusTypes } from 'types'
const Label = tw.label`block text-sm font-medium text-gray-700 capitalize`

const statusOptions = [
  { value: 'awaiting', label: 'Awaiting' },
  { value: 'approved', label: 'Approved' },
  { value: 'not approved', label: 'Not approved' }
] as unknown as Record<string, StatusTypes>[]

const categoryOptions = [
  { value: 'LMIA', label: 'LMIA' },
  { value: 'LMIA EXEMPT', label: 'LMIA EXEMPT' },
  { value: 'GTS', label: 'GTS' }
] as unknown as Record<string, CategoryTypes>[]

const visaTypeOptions = [
  { value: 'WP', label: 'WP' },
  { value: 'OWP', label: 'OWP' },
  { value: 'GTS, OWP', label: 'GTS, OWP' },
  { value: 'WP, OWP', label: 'WP, OWP' },
  { value: 'WP, OWP, VISITOR', label: 'WP, OWP, VISITOR' },
  { value: 'GTS, OWP, VISITOR', label: 'GTS, OWP, VISITOR' }
] as unknown as Record<string, VisaTypes>[]

const Fields = () => {
  const router = useRouter()
  const { setValue, register, getValues, control, reset } = useFormContext()

  return (
    <section tw="mt-10 sm:mt-0 md:grid md:grid-cols-2 md:gap-6">
      <div tw="mt-5 md:mt-0 md:col-span-2">
        <div tw="shadow overflow-hidden sm:rounded-md">
          <div tw="px-4 py-5 bg-white sm:p-6">
            <div tw="grid grid-cols-6 gap-6">
              <div tw="col-span-6 sm:col-span-3">
                <Label>Name (You do not need to add your last name)</Label>
                <Input
                  name="name"
                  placeholder="e.g: Drake"
                  {...register('name')}
                />
              </div>

              <div tw="col-span-6 sm:col-span-3">
                <Label>NOC</Label>
                <Input
                  name="noc"
                  placeholder="e.g: 2175"
                  {...register('noc')}
                />
              </div>

              <div tw="col-span-6 sm:col-span-3">
                <Label>Application Date</Label>
                <DateField
                  name="application_date"
                  value={getValues('application_date')}
                  onChange={({ target: { value } }) =>
                    setValue('application_date', value)
                  }
                  {...register('application_date')}
                />
              </div>
              <div tw="col-span-6 sm:col-span-3">
                <Label>Visa Response Date</Label>
                <DateField
                  name="visa_response_date"
                  value={getValues('visa_response_date')}
                  onChange={({ target: { value } }) =>
                    setValue('visa_response_date', value)
                  }
                  {...register('visa_response_date')}
                />
              </div>

              <div tw="col-span-6 sm:col-span-3">
                <Label>Application Category (LMIA | GTS | LMIA EXEMPT)</Label>
                <Controller
                  name="category"
                  control={control}
                  {...register('category')}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={categoryOptions.find(
                        ({ value }) => value === field.value
                      )}
                      onChange={({ target: { value } }) =>
                        setValue('category', value)
                      }
                      options={categoryOptions}
                    />
                  )}
                />
              </div>

              <div tw="col-span-6 sm:col-span-3">
                <Label>
                  Application Status (Awaiting, Approved | Not Approved)
                </Label>
                <Controller
                  name="status"
                  control={control}
                  {...register('status')}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={statusOptions.find(
                        ({ value }) => value === field.value
                      )}
                      onChange={({ target: { value } }) =>
                        setValue('status', value)
                      }
                      options={statusOptions}
                    />
                  )}
                />
              </div>
              <div tw="col-span-6 sm:col-span-3">
                <Label>Visa Type</Label>
                <Controller
                  name="visa_type"
                  control={control}
                  {...register('visa_type')}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={visaTypeOptions.find(
                        ({ value }) => value === field.value
                      )}
                      onChange={({ target: { value } }) =>
                        setValue('visa_type', value)
                      }
                      options={visaTypeOptions}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div tw="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-4">
            <Button variant="skyBlue" type="submit">
              Save
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                reset()
                router.push('/')
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Fields
