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