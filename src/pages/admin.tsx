import {PageWrapper, Input} from 'components'
import {useForm} from 'react-hook-form'

export const Admin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } 
  } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <PageWrapper pageTitle="andydierker.com | admin" hasHeader={true}>
      
      <main className="flex flex-col flex-1 items-center justify-start w-full px-10 xs:px-20 py-10 text-drkr-black">
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input labelText="name" className="w-full"/>   
        </form>

      </main>

    </PageWrapper>
  )
}

export default Admin