import { QuerySnapshot, DocumentData } from 'firebase/firestore'
import { GetStaticPathsResult, GetStaticPropsResult } from 'next'

export const onClickOpenLink = (url: string, newTab = true): void => {
  const newTabArgs = newTab ? ['_blank', 'noopener, noreferrer'] : ['_self']
  const newWindow = window.open(url, ...newTabArgs)
  if (newWindow) newWindow.opener = null
}

// QuerySnapshot<DocumentData> is annoying to deal with. even after mapping over it and getting all the data() out, we still have to spread it into an array because it comes as a big object with tons of metadata from Firestore
export const convertQuerySnapshotToData = <T extends unknown>(
  querySnapshot: QuerySnapshot<DocumentData>
): T[] => {
  return [...querySnapshot.docs.map((doc) => doc.data() as T)]
}

// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const convertContentToGetStaticPropsResult = <T extends unknown>(
  content: T,
  revalidate = true
): GetStaticPropsResult<T> => {
  return {
    props: JSON.parse(JSON.stringify(content)),
    revalidate,
  }
}

// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const convertContentToGetStaticPathsResult = (
  content: any[],
  // this is the name of the dynamic page key, ex: [recipe].tsx would be 'recipe', its the name of the "route"
  pathKey: string,
  // this is the name of the property on the content that we should set assign to the pageKey
  idKey: string,
  fallback = false
): GetStaticPathsResult => {
  const paths = content.map((x) => ({
    params: {
      [pathKey]: x[idKey],
    },
  }))
  return {
    paths,
    fallback,
  }
}

export const shuffleArray = (array: any[]) => {
  return [...Array(array.length)]
    .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
    .reduce((a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array)
}

export const getRandom = (arrayOrNumber: any[] | number) => {
  return Array.isArray(arrayOrNumber)
    ? shuffleArray(arrayOrNumber)[0]
    : Math.floor(Math.random() * arrayOrNumber)
}
