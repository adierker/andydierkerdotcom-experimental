import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {PageWrapper, Input} from 'components'

const formSchema = yup.object().shape({
  name: yup.string().required('Required!!')
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

          <label 
            htmlFor={'recipeName'} 
            className={`text-xl headline-spaced-font mr-3 ml-1 mb-1 block`}
          >
            Recipe name
          </label>
          <input 
            id="recipeName"
            {...register('name')}
            autoComplete="off"
            className={`drkr-focus border ${errors?.name ? 'border-drkr-red' : 'border-drkr-mid-gray'} border-2 h-10 px-2 focus-visible:bg-drkr-white focus-visible:border-drkr-black focus-visible:ring-offset-0 body-font w-full`}
          />
          <div className="h-5 my-1 mr-1 text-drkr-red headline-spaced-font text-right">{errors?.name?.message}</div>

          <label 
            htmlFor={'another'} 
            className={`text-xl headline-spaced-font mr-3 ml-1 mb-1 block`}
          >
            Another
          </label>
          <input 
            id="another"
            {...register('another')}
            autoComplete="off"
            className={`drkr-focus border ${errors?.another ? 'border-drkr-red' : 'border-drkr-mid-gray'} border-2 h-10 px-2 focus-visible:bg-drkr-white focus-visible:border-drkr-black focus-visible:ring-offset-0 body-font w-full`}
          />
          <div className="h-5 my-1 mr-1 text-drkr-red headline-spaced-font">{errors?.another?.message}</div>

        </form>

      </main>

    </PageWrapper>
  )
}

export default Admin