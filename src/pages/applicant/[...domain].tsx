import 'twin.macro'
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { convertToApplicationType } from 'helpers'
import { Fields, Template } from 'containers'
import { useSupabase } from 'services/useSupabase'
import { Box } from 'layout'
import type { ApplicationType } from 'types'

const NewApplicant = () => {
  const router = useRouter()
  const methods = useForm({ mode: 'all' })
  const service = useSupabase<ApplicationType>('applications')

  const { domain } = router.query

  const isEdit = domain && domain[0] === 'edit'
  const id = isEdit ? domain[1] : null

  useEffect(() => {
    if (id) service.getOne(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, service.getOne])

  const handleError = (errors) => errors

  const onSubmit = async (data) => {
    const convertedData = convertToApplicationType(data)

    await service.save(convertedData, id)

    toast.success(`Applicant ${isEdit ? 'updated' : 'added'} successfully`)
    methods.reset()
    router.push('/')
  }

  const handleRemove = async () => {
    await service.remove(id)
    toast.warn('Applicant removed successfully')
    methods.reset()
    router.push('/')
  }

  if (service.loading && isEdit) return <Box>Loading...</Box>

  return (
    <Template>
      <FormProvider {...methods}>
        <form
          tw="flex justify-center"
          onSubmit={methods.handleSubmit(onSubmit, handleError)}
        >
          <Fields values={isEdit && service.values} remove={handleRemove} />
        </form>
      </FormProvider>
    </Template>
  )
}

export default NewApplicant
