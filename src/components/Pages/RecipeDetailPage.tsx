import {ReactNode, useState, useEffect, useRef} from 'react'
import {useForm, Controller} from 'react-hook-form'

import {RecipeContent, IngredientGrouping, Ingredient} from 'types'

const Heading = ({heading}: {heading: string}) => (
  <h2 className="text-4xl mb-6 headline-font">
    {heading}
  </h2>
)

const Ul = ({children}: {children: ReactNode}) => (
  <ul className="list-disc list-inside mb-4">
    {children}
  </ul>
)

const Li = ({children}: {children: ReactNode}) => (
  <li className="mb-2 ml-4">
    {children}
  </li>
)

type ServingsFormValues = {
  servings: number
}

export const RecipeDetailPage = ({
  name,
  description,
  url,
  isScalable,
  defaultServings,
  ingredients,
  instructions,
  notes
}: RecipeContent) => {
  const [servings, setServings] = useState<number>(defaultServings)
  const hiddenSubmitButton = useRef<HTMLButtonElement>(null)
  const { 
    handleSubmit,
    control, 
  } = useForm<ServingsFormValues>({
    defaultValues: { 
      servings: defaultServings 
    }
  })

  useEffect(() => {
    console.log('here is where we should fetch new servings...', servings)
  }, [servings])

  const onBlurTriggerSubmit = () => {
    hiddenSubmitButton?.current?.click()
  }

  return (
    <main className="flex flex-col w-full px-10 xs:px-20 md:px-0 py-6 md:max-w-xl md:mx-auto text-drkr-black text-base body-font">

      <section id="intro" className="mb-10">
        <h1 className="text-5xl sm:text-6xl mb-6 text-center headline-font">
          {name}
        </h1>
        <div>
          {description}
        </div>
      </section>

      <section id="controls" className="mb-10">
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
      </section>

      <section id="ingredients" className="mb-10">
        <Heading heading="Ingredients"/>
        {ingredients.map(({name, items}: IngredientGrouping, groupingIndex) => (
          <div key={`grouping-${groupingIndex}`}>
            {name && <h3 className="mb-2 headline-spaced-font">{name}</h3>}
            <Ul> 
              {items.map(({num, unit, ingredient}: Ingredient, itemIndex) => {
                const isPlural = num && (typeof num === 'number') && (num > 1)
                return (
                  <Li key={`{${ingredient}-${itemIndex}`}>
                    {num && `${num.toString()} `}
                    {unit && `${unit}${isPlural ? 's' : ''} `}
                    {ingredient}
                  </Li>
                )
              })}
            </Ul>
          </div>
        ))}
      </section>

      <section id="instructions" className="mb-10">
        <Heading heading="Instructions"/>
        <Ul>
          {instructions().map((instruction, index) => (
            <Li key={`${instruction}-${index}`}>
              {instruction}
            </Li>
          ))}
        </Ul>
      </section>

    </main>
  )
}