# Link Strategy

## Link Background

From https://stackoverflow.com/questions/65086108/next-js-link-vs-router-push-vs-a-tag...

> Buttons are for actions and links are to go somewhere.
> 
> If you are using NextJs, I'm assuming SEO matters to you here.
> 
> Consider these before making a decision:
> 
> - `router.push()` is mostly used in an event handler (like `onClick`). This is an action. So let's say you click on the button, then you do some task, and based on the result you take the user to another page. Then you'd want to use `router.push()`. Don't use it just to go to another page. Note that this is bad for SEO if you want it to be crawled.
> 
> - `Link` does some heavy lifting for you and has a bunch of props that you can pass to customize it. This is what you need most of the time to go to another page. When you are using it, the default browser's behavior to reload the whole page (as you'd see with the `<a>` tag) is overridden. Crawlers see it as a link to another page, so it's good for SEO.
> 
> - `<a>` tag is just a plain HTML element, with all the default behaviors. When you use it, a full reload happens. If you are using it, try switching to `<Link>`. Similar to `<Link>`, it's good for SEO and accessibility.



## Link Strategy For This App

### Internal Link via HTML element
- wrap the `<a>` in a `<Link>` provided by NextJS, or use the <InternalLink> component, which does this automatically and adds some default styles

### Internal Link via onClick handler
- destructure `router` from NextJS's `useRouter()`, use `router.push()`

### External Link via HTML element
- use an `<a>`, or use the <ExternalLink> component, which adds some default styles and things like target _blank and noopener noreferrer

### External Link via onClick handler
- use the `onClickOpenLink` function in `utils`



# Data Fetching Strategy

All the content for this site is stored in Firestore, which we initialize in `src/database/client`. Only the backend has access to this database - if you try to access it in the frontend, it will throw and error. This is because the Firestore credentials are stored in `.env` files that NextJS only keeps on its backend server. 


## Fetching data with getStaticProps (getstaticprops -> firestore database)


NextJS can generate static site content automatically through a few different helper functions, like `getStaticProps` and `getStaticPaths`. This app mainly uses those functions to generate its content at build-time to keep loadtimes down. These functions have magical access to the Firestore db because they are technically run on the server, so you can call Firestore directly from these functions, like we do on the homepage: `src/pages/index.tsx`

```
  export const getStaticProps = async (): Promise<GetStaticPropsResult<RecipeListPageContent>> => {
    const recipeListPageContent = await getDocumentFromFirestore<RecipeListPageContent>(COLLECTIONS.PAGES, '/recipes')
    return convertContentToGetStaticPropsResult<RecipeListPageContent>(recipeListPageContent)
  }

  export const Recipes = (props: RecipeListPageContent) => {
    return (
      <PageWrapper pageTitle="andydierker.com | recipes" hasHeader={true}>
        <RecipeListPage {...props}/>
      </PageWrapper>
    )
  }
```


## Fetching data from the frontend (component -> axios request -> nextjs api route -> firestore database)

Sometimes we need to fetch data from the frontend the old-fashioned way. To do this, we must make a normal API request with axios, but instead of calling Firestore with axios (again, the frontend won't be able to talk to the database, it doesn't have the credentials), we proxy the request through NextJS's `pages/api`. So the request goes: frontend component uses axios to -> call the pages/api handler -> which can access the Firestore db. I don't think this app does this anymore, but an example would look like this:

Frontend component would use the async fetcher function hook:

```
  const {data} = useEffectAsync(getRecipeListContentFromApi, [getRecipeListContentFromApi])
  const recipeList: RecipeListContent = data
```

In `services/api` we define the `getRecipeListContentFromApi` function, and call our NextJS backend API:

```
  export const getRecipeListContentFromApi = async (): Promise<RecipeListContent> => {
    const response: AxiosResponse<RecipeListContent> = await axios.get(ENDPOINTS.RECIPES)
    const recipeList: RecipeListContent = response.data
    return recipeList
  }
```

The NextJS backend API accesses Firestore and sends it back:

```
  export default async (req: NextApiRequest, res: NextApiResponse<RecipeListContent>) => {
    res.setHeader('Content-Type', 'application/json')
    const recipeListContent: RecipeListContent = await getCollectionFromFirestore(COLLECTIONS.RECIPES)
    return res.status(200).json(recipeListContent)
  }
```