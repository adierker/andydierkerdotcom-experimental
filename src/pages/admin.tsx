import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {PageWrapper, Input} from 'components'

const formSchema = yup.object().shape({
  name: yup.string().required("The recipe needs a name."),
  path: yup.string().required("The recipe needs a path."),
})

export const Admin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } 
  } = useForm({
    // mode: 'onBlur',
    resolver: yupResolver(formSchema)
  })
  const onSubmit = data => console.log(data)

  console.log(watch())

  return (
    <PageWrapper pageTitle="andydierker.com | admin" hasHeader={true}>
      
      <main className="flex flex-col items-center justify-center px-10 xs:px-20 py-10 text-drkr-black">
        
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

          <Input 
            id="name"
            label="Recipe name"
            error={errors?.name}
            {...register('name')}
          />

          <Input 
            id="path"
            label="path"
            error={errors?.path}
            {...register('path')}
          />

          <button type="submit">button</button>

        </form>

      </main>

    </PageWrapper>
  )
}

export default Admin