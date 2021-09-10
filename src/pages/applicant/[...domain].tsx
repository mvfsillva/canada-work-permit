import { useForm, FormProvider as ReactFormProvider } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useObjectVal } from 'react-firebase-hooks/database'

import { Header } from 'components'
import { Container } from 'layout'
import { Fields } from 'containers'
import { create, firebase } from 'services'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormProvider = ReactFormProvider as unknown as any

const NewApplicant = () => {
  const router = useRouter()
  const { domain } = router.query
  const isEdit = !!domain
  const id = isEdit ? domain[1] : null

  const [values] = useObjectVal(firebase.ref(`/applications/${id}`))

  const methods = useForm()
  const onSubmit = (data) => {
    toast.success('Applicant added successfully')
    create(data)
    methods.reset()
    router.push('/')
  }

  return (
    <Container>
      <Header />
      <FormProvider {...methods} defaultValues={values}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Fields />
        </form>
      </FormProvider>
    </Container>
  )
}

export default NewApplicant
