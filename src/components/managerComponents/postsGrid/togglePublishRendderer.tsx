import React from 'react';
import { ICellRendererParams } from '@ag-grid-community/core';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { doc, updateDoc } from "firebase/firestore";
import FirebaseServices from '../../../firebase/firebaseServices';
import { useStores } from '../../../mst/rootStoreContext';

const TogglePublishRendderer: React.FC<ICellRendererParams> = ({ api, node, value }) => {
  const { unpublishedPosts, posts } = useStores();

    /**
   * Set published state for spesific blog post.
   * @param nextState true if the post needs to be published, false if post needs to be hidden.
   * @param id firebase document id for spesific post.
   * @returns Promise<void>
   */
  const setPublished = async (nextState: boolean, id: string) => {
    const firestoreInstance = FirebaseServices.getFirestoreInstance();
    const ref = doc(firestoreInstance, 'post', id);
    const data = nextState
      ? unpublishedPosts.find(x => x.id === id)
      : posts.find(x => x.id === id)
    await updateDoc(ref, {
      ...data,
      published: nextState,
    })
    .then(() => {
      console.log(id, 'UPDATED');
      api.refreshCells();
    })
    .catch(error => console.error('CANNOT UPDATE', error.message));
  }

  return (
      value === true
          ? <AiFillEye
              size={25}
              style={{justifySelf:'center', display:'flex'}}
              onClick={() => setPublished(false, node.data.id)}
            />
          : <AiFillEyeInvisible
              size={25}
              style={{justifySelf:'center', display:'flex'}}
              onClick={() => setPublished(true, node.data.id)}
            />
  )
}

export default TogglePublishRendderer
