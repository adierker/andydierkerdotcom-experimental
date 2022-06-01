import {
  doc,
  getDoc,
  DocumentData,
  DocumentReference,
  getDocs,
  collection,
  QuerySnapshot,
} from 'firebase/firestore'

import { db } from 'database'
import { CollectionsType } from 'types'
import { convertQuerySnapshotToData } from 'utils'

// the functions on this page fetch content from firestore directly
// the frontend cannot call these methods on its own, because it cannot initialize the firestore app
// (it doesn't have access to the credentials in "db", only the backend does)

// instead, these functions can be called from two places:
// - from NextJS's SSR/static generation helpers, "getStaticProps" and "getStaticPaths"
// - or from NextJS's backend /pages/api files, which can be called from the frontend using axios

export const getDocumentFromFirestore = async <T extends unknown>(
  requestedCollection: CollectionsType,
  requestedDocument: string
): Promise<T> => {
  console.log('DB IS:', db, requestedCollection, requestedDocument)
  const docRef: DocumentReference<DocumentData> = doc(
    db,
    requestedCollection,
    requestedDocument
  )
  const document: DocumentData = await getDoc(docRef)
  const documentData = document.data()
  return documentData as T
}

export const getCollectionFromFirestore = async <T extends unknown>(
  requestedCollection: CollectionsType
): Promise<T> => {
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
    collection(db, requestedCollection)
  )
  const collectionData = convertQuerySnapshotToData(querySnapshot)
  return collectionData as T
}
