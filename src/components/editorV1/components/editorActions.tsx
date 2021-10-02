import React, { useState } from 'react';
import FirebaseServices from '../../../firebase/firebaseServices';
import { collection, addDoc } from "firebase/firestore"; 
import { IEditorItem } from '../types/editorItem';
import styles from './editorActions.module.scss';

type EditorActionsProps = {
  newPost: IEditorItem,
};

const EditorActions: React.FC<EditorActionsProps> = ({ newPost }) => {
  // TODO add activity indicator
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handle = async (publish: boolean) => {

    if (!newPost.header) {
      alert('Caption missing!');
      return;
    }

    if (!newPost.category) {
      alert('Category missing!');
      return;
    }

    if (!newPost.contentHTML) {
      alert('Post content cannot be empty!');
      return;
    }

    if (newPost.editorVersion !== '1.0') {
      alert('Wrong editor version!');
      return;
    }
    
    const firestore = FirebaseServices.getFirestoreInstance();
    const auth = FirebaseServices.getAuthInstance();
    const uid = auth.currentUser?.uid;

    if (!uid) {
      console.error('Cannot save post!, uid is undefined!');
      return;
    }

    setInProgress(true);

    await addDoc(collection(firestore, 'post'), {
      caption: newPost.header,
      category: newPost.category,
      contentHTML: newPost.contentHTML,
      editorVersion: newPost.editorVersion,
      tags: newPost.tags,
      published: publish,
      time: new Date().getTime(),
      userId: uid,
    })
    .catch((err) => {
      console.error('Rejected', err)
    })
    .finally(() => setInProgress(false));
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <button
          onClick={() => handle(false)}
          className={styles.btnSave}
        >
          Save
        </button>
        <button
          onClick={() => handle(true)}
          className={styles.btnPublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default EditorActions;
