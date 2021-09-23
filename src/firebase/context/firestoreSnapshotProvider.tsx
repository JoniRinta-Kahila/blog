import React, { useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import FirebaseServices from '../firebaseServices';
import { useStores } from '../../mst/rootStoreContext';
import { BlogPost } from '../../components/editorV1/createNewPost';

const FirestoreSnapshotProvider: React.FC = ({children}) => {
  const rootStore = useStores();

  useEffect(() => {
    const firebase = FirebaseServices.getFirestoreInstance();
    const q = query(collection(firebase, 'post'), where('published', '==', true))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(x => x.data() as BlogPost);
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
