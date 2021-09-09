import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {PageWrapper, Input} from 'components'
import {REGEX} from 'consts'

const formSchema = yup.object().shape({
  name: yup.string().required(`Name is required.`),
  path: yup.string().required(`Path is required.`).matches(REGEX.LOWERCASE_AND_NUMBERS_AND_DASHES, `Only lowercase letters, numbers, and dashes are allowed.`),
  url: yup.string().required(`URL is required.`).matches(REGEX.URL, `Must be a valid URL.`)
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
            error={errors.name}
            {...register('name')}
          />
          <Input 
            id="path"
            label="Path/URL"
            error={errors.path}
            {...register('path')}
          />
          <Input 
            id="url"
            label="Original recipe URL"
            error={errors.url}
            {...register('url')}
          />

          <>
            <div className="text-xl headline-spaced-font mr-3 ml-1 mb-1 block">
              Scalable?
            </div>
            <div className="flex flex-row items-center">
              <input
                id="yes"
                type="radio"
                value="true"
                className="appearance-none border-drkr-mid-gray sq-8 border-2 rounded-full bg-drkr-white checked:bg-drkr-green radio-inset cursor-pointer drkr-radio-focus"
                {...register("yesno", { required: true })}
              />
              <label htmlFor="yes" className="body-font ml-3 mr-5">
                Yes
              </label>
              <input
                id="no"
                type="radio"
                value="false"
                className="appearance-none border-drkr-mid-gray sq-8 border-2 rounded-full bg-drkr-white checked:bg-drkr-green radio-inset cursor-pointer drkr-radio-focus"
                {...register("yesno", { required: true })}
              />
              <label htmlFor="no" className="body-font ml-3">
                No
              </label>
            </div>
          </>


          <button className="mt-10 block" type="submit">button</button>

        </form>

      </main>

    </PageWrapper>
  )
}

export default Admin