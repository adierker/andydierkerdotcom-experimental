import {QuerySnapshot} from 'firebase/firestore'
import {GetStaticPathsResult, GetStaticPropsResult} from 'next'

export const onClickOpenLink = (url: string, newTab: boolean = true) => {
  const newTabArgs = newTab ? ['_blank', 'noopener, noreferrer'] : ['_self']
  const newWindow = window.open(url, ...newTabArgs)
  if (newWindow) newWindow.opener = null
}

// QuerySnapshot<DocumentData> is annoying to deal with. even after mapping over it and getting all the data() out, we still have to spread it into an array because it comes as a big object with tons of metadata from Firestore
export const convertQuerySnapshotToData = (querySnapshot: QuerySnapshot<any>) => {
  return [...querySnapshot.docs.map(doc => doc.data())]
}

// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const convertContentToGetStaticPropsResult = <T extends unknown>(
  content: T,
  revalidate: boolean = true
): GetStaticPropsResult<T> => {
  const jsonContent = JSON.parse(JSON.stringify(content))
  return {
    props: jsonContent,
    revalidate
  }
}

// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const convertContentToGetStaticPathsResult = <T extends unknown>(
  content: T[],
  // this is the name of the dynamic page key, ex: [recipe].tsx would be 'recipe'
  pathKey: string,
  // this is the name of the property on the content that we should set assign to the pageKey
  idKey: string,
  fallback: boolean = false
): GetStaticPathsResult => {
  const paths = content.map(x => ({
    params: { 
      [pathKey]: x[idKey]
    }
  }))
  console.log('paths is:', paths)
  return {
    paths,
    fallback
  }
}