import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { PageWrapper, Input, Radio } from 'components'
import { REGEX } from 'consts'

const formSchema = yup.object().shape({
  name: yup.string().required(`Name is required.`),
  path: yup
    .string()
    .required(`Path is required.`)
    .matches(
      REGEX.LOWERCASE_AND_NUMBERS_AND_DASHES,
      `Only lowercase letters, numbers, and dashes are allowed.`
    ),
  url: yup
    .string()
    .required(`URL is required.`)
    .matches(REGEX.URL, `Must be a valid URL.`),
  scalable: yup.string().required(`Scalability is required.`).nullable(true),
})

export const Admin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    // mode: 'onBlur',
    resolver: yupResolver(formSchema),
  })
  const onSubmit = (data) => console.log(data)

  console.log(watch())

  return (
    <PageWrapper pageTitle="andydierker.com | admin" hasHeader={true}>
      <main className="flex flex-col items-center justify-center px-10 xs:px-20 py-10 text-drkr-black">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            label="Recipe name *"
            error={errors.name}
            {...register('name')}
          />
          <Input
            id="path"
            label="Path/URL *"
            error={errors.path}
            {...register('path')}
          />
          <Input
            id="url"
            label="Original recipe URL *"
            error={errors.url}
            {...register('url')}
          />
          <Radio
            id="scalable"
            label="Scalable? *"
            options={[
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ]}
            error={errors.scalable}
            {...register('scalable', { required: true })}
          />

          <button className="mt-10 block" type="submit">
            button
          </button>
        </form>
      </main>
    </PageWrapper>
  )
}

export default Admin
