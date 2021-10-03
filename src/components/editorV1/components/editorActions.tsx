import React, { useState } from 'react';
import FirebaseServices from '../../../firebase/firebaseServices';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; 
import { IEditorItem } from '../types/editorItem';
import styles from './editorActions.module.scss';

type EditorActionsProps = {
  postObj: IEditorItem,
  previewOnly?: boolean,
};

interface IFirebaseActionResult {
  canResolve: boolean,
  error?: any,
}

const addFirebaseDocument = async (data: IEditorItem, publish: boolean): Promise<IFirebaseActionResult> => {
  const firestore = FirebaseServices.getFirestoreInstance();
  const auth = FirebaseServices.getAuthInstance();
  const uid = auth.currentUser?.uid;

  return await addDoc(collection(firestore, 'post'), {
    header: data.header,
    subHeader: data.subHeader,
    caption: data.caption,
    category: data.category,
    contentHTML: data.contentHTML,
    displayImage: data.displayImage,
    editorVersion: data.editorVersion,
    tags: data.tags,
    published: publish,
    time: new Date().getTime(),
    userId: uid,

  })
  .then(() => {
    return { canResolve: true}
  })
  .catch((err) => {
    return { canResolve: false, error: err}
  });
};

const updateFirebaseDocument = async (data: IEditorItem, publish: boolean): Promise<IFirebaseActionResult> => {
  const firestoreInstance = FirebaseServices.getFirestoreInstance();
  const docRef = doc(firestoreInstance, 'post', data.id);
  const auth = FirebaseServices.getAuthInstance();
  const uid = auth.currentUser?.uid;

  return await updateDoc(docRef, {
    header: data.header,
    subHeader: data.subHeader,
    caption: data.caption,
    category: data.category,
    contentHTML: data.contentHTML,
    displayImage: data.displayImage,
    editorVersion: data.editorVersion,
    tags: data.tags,
    published: publish,
    time: data.time,
    userId: uid,
  })
  .then(() => {
    return { canResolve: true}
  })
  .catch((err) => {
    return { canResolve: false, error: err}
  });
};

/**
 * 
 * @param postObj: IEditorItem
 * @param previewOnly boolean, if true: display preview button only.
 * @returns React.FC<EditorActionsProps>
 */
const EditorActions: React.FC<EditorActionsProps> = ({ postObj, previewOnly = false }) => {
  // TODO add activity indicator
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handle = async (publish: boolean) => {

    if (!postObj.header) {
      alert('Caption missing!');
      return;
    }

    if (!postObj.category) {
      alert('Category missing!');
      return;
    }

    if (!postObj.contentHTML) {
      alert('Post content cannot be empty!');
      return;
    }

    if (postObj.editorVersion !== '1.0') {
      alert('Wrong editor version!');
      return;
    }
    
    const auth = FirebaseServices.getAuthInstance();
    const uid = auth.currentUser?.uid;

    if (!uid) {
      console.error('Cannot save post!, uid is undefined!');
      return;
    }

    setInProgress(true);

    const action = postObj.new
      ? addFirebaseDocument
      : updateFirebaseDocument

    await action(postObj, publish)
      .then((res) => {
        if (res.canResolve) {
          console.log('Firebase action', action.name, 'completed!');
        } else {
          console.error('Firebase action', action.name, 'rejected!', res.error);
        }
      })
      .finally(() => setInProgress(false));
  };

  return !previewOnly
    ? (
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
      )
    : (
      <div className={styles.container}>
        <div className={styles.actions}>
          <button
            onClick={() => {
              const previewTab = document.querySelector('#react-tabs-2') as HTMLElement;
              if (previewTab) {
                previewTab.click()
              }
            }}
            className={styles.btnSave}
          >
            Preview
          </button>
        </div>
      </div>
    )
};

export default EditorActions;
