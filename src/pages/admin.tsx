import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {PageWrapper, Input} from 'components'

const formSchema = yup.object().shape({
  name: yup.string().required('Required!')
})

export const Admin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } 
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(formSchema)
  })
  const onSubmit = data => console.log(data)

  const recipeName = register('name')
  
  return (
    <PageWrapper pageTitle="andydierker.com | admin" hasHeader={true}>
      
      <main className="flex flex-col items-center justify-center px-10 xs:px-20 py-10 text-drkr-black">
        
        <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <Input 
            id="name"
            labelText="Recipe Name"
            className="w-full"
            inputRef={recipeName.ref}
          />
        </form>
        {/* {errors && <div>{errors}</div>} */}

      </main>

    </PageWrapper>
  )
}

export default Admin