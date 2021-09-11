import tw from 'twin.macro'
import { useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { DateField, Input, Select, Button } from 'components'
import { useRouter } from 'next/router'
import type {
  VisaTypes,
  CategoryTypes,
  StatusTypes,
  ApplicationType
} from 'types'

const Label = tw.label`block text-sm font-medium text-gray-700 capitalize mb-2`
const Block = tw.div`col-span-6 sm:col-span-3`

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

const Fields = ({ values }: { values?: ApplicationType }) => {
  const router = useRouter()
  const { setValue, register, control, reset } = useFormContext()

  useEffect(() => {
    if (values) {
      Object.keys(values).forEach((key) => {
        setValue(key, values[key])
      })
    }
  }, [setValue, values])

  return (
    <section tw="shadow-lg overflow-hidden sm:rounded-md">
      <div tw="grid grid-cols-6 gap-6 px-4 py-5 sm:p-6">
        <Block>
          <Label>Name (You do not need to add your last name)</Label>
          <Input name="name" placeholder="e.g: Drake" {...register('name')} />
        </Block>
        <Block>
          <Label>NOC</Label>
          <Input name="noc" placeholder="e.g: 2175" {...register('noc')} />
        </Block>
        <Block>
          <Label>Application Date</Label>
          <Controller
            name="application_date"
            control={control}
            {...register('application_date')}
            render={({ field }) => (
              <DateField
                value={field.value}
                onChange={({ target: { value } }) =>
                  setValue('application_date', value)
                }
              />
            )}
          />
        </Block>
        <Block>
          <Label>Visa Response Date</Label>
          <Controller
            name="visa_response_date"
            control={control}
            {...register('visa_response_date')}
            render={({ field }) => (
              <DateField
                value={field.value}
                onChange={({ target: { value } }) =>
                  setValue('visa_response_date', value)
                }
              />
            )}
          />
        </Block>
        <Block>
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
        </Block>
        <Block>
          <Label>Application Status (Awaiting, Approved | Not Approved)</Label>
          <Controller
            name="status"
            control={control}
            {...register('status')}
            render={({ field }) => (
              <Select
                {...field}
                value={statusOptions.find(({ value }) => value === field.value)}
                onChange={({ target: { value } }) => setValue('status', value)}
                options={statusOptions}
              />
            )}
          />
        </Block>
        <Block>
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
        </Block>
      </div>
      <div tw="md:grid md:grid-cols-2 md:gap-6 p-4 sm:w-full md:w-5/12">
        <Button label="Save" variant="skyBlue" type="submit" />
        <Button
          label="cancel"
          variant="primary"
          onClick={() => {
            reset()
            router.push('/')
          }}
        />
      </div>
    </section>
  )
}

export default Fields
