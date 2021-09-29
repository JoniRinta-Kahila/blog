import React, { useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import FirebaseServices from '../firebaseServices';
import { useStores } from '../../mst/rootStoreContext';
import { BlogPost } from '../../components/editorV1/createNewPost';
import { useFirebaseUserContext } from './firebaseUserContextProvider';

const FirestoreSnapshotProvider: React.FC = ({children}) => {
  const rootStore = useStores();
  const { isAdmin } = useFirebaseUserContext();

  useEffect(() => {
    const firebase = FirebaseServices.getFirestoreInstance();

    const qu = isAdmin
      ? query(collection(firebase, 'post'))
      : query(collection(firebase, 'post'), where('published', '==', true))

    const unsubscribe = onSnapshot(qu, (querySnapshot) => {
      console.log('Firestore onSnapshot called.')
      const data = querySnapshot.docs.map(x => {
        let row = x.data()
        row.id = x.id;
        return row as BlogPost;
      });

      rootStore.setPosts(data as any);
    });
    return () => unsubscribe();
  });
  
  return (
    <div>
      {children}
    </div>
  )
}

export default FirestoreSnapshotProvider
