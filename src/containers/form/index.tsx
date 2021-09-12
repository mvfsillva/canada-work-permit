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

const Label = tw.label`block text-sm font-medium text-gray-700 mb-2`
const Error = tw.label`block text-sm font-medium text-red-700 h-2 mt-2`
const Block = tw.div`col-span-6 sm:col-span-3`
const Required = tw.span`text-red-600 ml-1 font-black`

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
  const {
    setValue,
    register,
    control,
    reset,
    formState: { errors }
  } = useFormContext()

  useEffect(() => {
    if (values) {
      Object.keys(values).forEach((key) => {
        setValue(key, values[key])
      })
    }
  }, [setValue, values])

  console.log(errors)

  return (
    <section tw="shadow-lg overflow-hidden sm:rounded-md">
      <div tw="grid grid-cols-6 gap-6 px-4 py-5 sm:p-6">
        <Block>
          <Label>
            Name<Required>*</Required>
          </Label>
          <Input
            name="name"
            placeholder="e.g: Drake"
            hasError={errors.name}
            {...register('name', {
              required: true
            })}
          />
          <Error>{errors?.name && 'Name is required'}</Error>
        </Block>
        <Block>
          <Label>
            NOC<Required>*</Required>
          </Label>
          <Input
            name="noc"
            placeholder="e.g: 2175"
            hasError={errors.noc}
            {...register('noc', {
              required: true
            })}
          />
          <Error>{errors?.noc && 'Noc is required'}</Error>
        </Block>
        <Block>
          <Label>
            Application Date<Required>*</Required>
          </Label>
          <Controller
            name="application_date"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            {...register('application_date', {
              required: true
            })}
            render={({ field }) => (
              <DateField
                hasError={errors.application_date}
                value={field.value}
                onChange={({ target: { value } }) =>
                  setValue('application_date', value)
                }
              />
            )}
          />
          <Error>
            {errors?.application_date && 'Application Date is required'}
          </Error>
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
          <Label>
            Application Category (LMIA | GTS | LMIA EXEMPT)
            <Required>*</Required>
          </Label>
          <Controller
            name="category"
            control={control}
            {...register('category', {
              required: true
            })}
            render={({ field }) => (
              <Select
                {...field}
                hasError={errors.category}
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
          <Error>{errors?.category && 'Category is required'}</Error>
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
          <Label>
            Visa Type <Required>*</Required>
          </Label>
          <Controller
            name="visa_type"
            control={control}
            {...register('visa_type', {
              required: true
            })}
            render={({ field }) => (
              <Select
                {...field}
                hasError={errors.visa_type}
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
          <Error>{errors?.visa_type && 'Visa Type is required'}</Error>
        </Block>
      </div>
      <div tw="md:grid md:grid-cols-2 md:gap-6 p-4 sm:w-full md:w-5/12">
        <Button label="Save" variant="skyBlue" type="submit" />
        <Button
          label="Cancel"
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
