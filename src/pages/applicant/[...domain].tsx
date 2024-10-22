import 'twin.macro'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useObjectVal } from 'react-firebase-hooks/database'

import { Fields, Template } from 'containers'
import { firebase, firebaseCreate, firebaseUpdate } from 'services'
import type { ApplicationType } from 'types'

const NewApplicant = () => {
  const router = useRouter()
  const methods = useForm({ mode: 'all' })
  const { domain } = router.query

  const isEdit = domain && domain[0] === 'edit'
  const id = isEdit ? domain[1] : null
  const applicantRef = firebase.ref(`/applications/${id}`)

  const [values] = useObjectVal<ApplicationType>(applicantRef)

  const handleError = (errors) => errors

  const onSubmit = (data) => {
    toast.success(`Applicant ${isEdit ? 'updated' : 'added'} successfully`)
    methods.reset()
    router.push('/')

    if (isEdit) {
      return firebaseUpdate(id, data)
    }

    return firebaseCreate(data)
  }

  const handleRemove = () => {
    toast.warn('Applicant removed successfully')
    router.push('/')
    methods.reset()

    return firebase.ref(`/applications/${id}`).remove()
  }

  return (
    <Template>
      <FormProvider {...methods}>
        <form
          tw="flex justify-center"
          onSubmit={methods.handleSubmit(onSubmit, handleError)}
        >
          <Fields values={isEdit && values} remove={handleRemove} />
        </form>
      </FormProvider>
    </Template>
  )
}

export default NewApplicant
