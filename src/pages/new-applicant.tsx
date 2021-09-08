import { useForm, FormProvider as ReactFormProvider } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { Header } from 'components'
import { Container } from 'layout'
import { Fields } from 'containers'
import { create } from 'services'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormProvider = ReactFormProvider as unknown as any

const NewApplicant = () => {
  const methods = useForm()
  const router = useRouter()
  const onSubmit = (data) => {
    toast.success('Applicant added successfully')
    create(data)
    methods.reset()
    router.push('/')
  }

  return (
    <Container>
      <Header />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Fields />
        </form>
      </FormProvider>
    </Container>
  )
}

export default NewApplicant
