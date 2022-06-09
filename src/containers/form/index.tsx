import 'twin.macro'
import { useEffect, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import { DateField, Input, Select, Button, FormField } from 'components'
import { Section } from 'layout'

import type {
  VisaTypes,
  CategoryTypes,
  StatusTypes,
  ApplicationType
} from 'types'

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
  { value: 'WP, OWP', label: 'WP, OWP' },
  { value: 'WP, OWP, VISITOR', label: 'WP, OWP, VISITOR' }
] as unknown as Record<string, VisaTypes>[]

const Fields = ({
  values,
  remove
}: {
  values?: ApplicationType
  remove: () => void
}) => {
  const [isVisaResponseRequired, setIsVisaResponseRequired] = useState(false)
  const router = useRouter()

  const { domain } = router.query
  const isEdit = domain && domain[0] === 'edit'

  const {
    setValue,
    register,
    control,
    reset,
    formState: { errors }
  } = useFormContext()

  const handleRemove = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#074B3A',
      cancelButtonColor: '#AC1A1A',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Application has been deleted.', 'info')
        remove()
      }
    })
  }

  useEffect(() => {
    if (values) {
      Object.keys(values).forEach((key) => {
        setValue(key, values[key])
      })
    }
  }, [setValue, values])

  return (
    <Section>
      <div tw="grid grid-cols-6 gap-2 p-4">
        <FormField label="Name" error={errors?.name} isRequired>
          <Input
            name="name"
            placeholder="e.g: Drake"
            hasError={errors.name}
            {...register('name', {
              required: true
            })}
          />
        </FormField>
        <FormField label="NOC" error={errors?.noc} isRequired>
          <Input
            name="noc"
            placeholder="e.g: 2175"
            hasError={errors.noc}
            {...register('noc', {
              required: true
            })}
          />
        </FormField>
        <FormField
          label="Application Date"
          error={errors.application_date}
          isRequired
        >
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
        </FormField>
        {isEdit && (
          <FormField
            label="Visa Response Date"
            error={errors.visa_response_date}
            isRequired={isVisaResponseRequired}
          >
            <Controller
              name="visa_response_date"
              control={control}
              render={({ field }) => (
                <DateField
                  hasError={errors.visa_response_date}
                  value={field.value}
                  onChange={({ target: { value } }) =>
                    setValue('visa_response_date', value)
                  }
                />
              )}
            />
          </FormField>
        )}
        <FormField
          label="Application Category"
          error={errors?.category}
          isRequired
        >
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
        </FormField>
        <FormField label="Application Status">
          <Controller
            name="status"
            control={control}
            {...register('status')}
            render={({ field }) => (
              <Select
                {...field}
                value={statusOptions.find(({ value }) => value === field.value)}
                onChange={({ target: { value } }) => {
                  setValue('status', value)
                  if (value.label !== 'Awaiting') {
                    setIsVisaResponseRequired(true)
                    register('visa_response_date', {
                      required: true
                    })
                  }
                }}
                options={statusOptions}
              />
            )}
          />
        </FormField>
        <FormField label="Visa Type" error={errors.visa_type} isRequired>
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
        </FormField>
      </div>
      <div tw="md:grid md:grid-cols-3 md:gap-6 p-4 sm:w-full md:w-8/12">
        <Button label="Save" variant="skyBlue" type="submit" />
        <Button
          label="Cancel"
          variant="gray"
          onClick={() => {
            reset()
            router.push('/')
          }}
        />
        {values && !!Object.keys(values).length && (
          <Button label="Delete" variant="primary" onClick={handleRemove} />
        )}
      </div>
    </Section>
  )
}

export default Fields
