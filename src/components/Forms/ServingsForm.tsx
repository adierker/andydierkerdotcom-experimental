import {useRef, Dispatch, SetStateAction} from 'react'
import {useForm, Controller} from 'react-hook-form'


interface ServingsFormProps {
  defaultServings: number
  setServings: Dispatch<SetStateAction<number>>
}

type ServingsFormValues = {
  servings: number
}

export const ServingsForm = ({defaultServings, setServings}: ServingsFormProps) => {
  const hiddenSubmitButton = useRef<HTMLButtonElement>(null)
  const { 
    handleSubmit,
    control, 
  } = useForm<ServingsFormValues>({
    defaultValues: { 
      servings: defaultServings 
    }
  })

  const onBlurTriggerSubmit = () => {
    hiddenSubmitButton?.current?.click()
  }

  return (
    <form 
      className="flex items-center headline-spaced-font"
      // onSubmit will trigger when: the user presses "enter" in the input, or the hidden submit button is clicked (triggered onBlur)
      // the setServings function will only be called if the form is valid (see "validate" function below)
      onSubmit={handleSubmit(({servings}) => setServings(servings))}
    >
      <label className="text-2xl headline-spaced-font mr-3">
        Servings
      </label>
      <Controller
        control={control}
        name="servings"
        rules={{
          required: true,
          validate: value => value > 0
        }}
        render={({ field }) => (
          <input
            className="sq-10 text-center drkr-focus border border-drkr-mid-gray border-2 focus-visible:bg-drkr-white focus-visible:border-drkr-black"
            type="text"
            maxLength={2}
            autoComplete="off"
            {...field}
            // field.onChange is how we transform a value before it gets saved, whatever is returned from onChange is set to the value for this field
            // convert the input to a number, if it can't, change it to 0
            onChange={(e) => field.onChange(parseInt(e.target.value.replace(/\D/g,''), 10) || 0)}
            // when the input is unfocused, if its anything other than a positive integer, change it to 1 instead
            onBlur={(e) => {
              const parsedValue = parseInt(e.target.value, 10)
              if (isNaN(parsedValue) || parsedValue < 1) {
                // passing field.onChange a value is actually how we manually SET the value for the field
                field.onChange(1)
              }
              // click the hidden submit button to submit onBlur
              onBlurTriggerSubmit()
            }}
          />
        )}
      />
      <button hidden={true} ref={hiddenSubmitButton} type="submit"/>
    </form> 
  )
}