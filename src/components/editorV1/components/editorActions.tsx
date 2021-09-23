import React, { useState } from 'react';
import FirebaseServices from '../../../firebase/firebaseServices';
import { BlogPost } from '../createNewPost';
import { collection, addDoc } from "firebase/firestore"; 

type EditorActionsProps = {
  newPost: BlogPost,
}

const EditorActions: React.FC<EditorActionsProps> = ({ newPost }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handle = async (publish: boolean) => {

    if (!newPost.caption) {
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
      caption: newPost.caption,
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
  }

  return (
    <div style={{
      borderTop:'none',
      padding:'10px',
      borderRadius: '2px'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'end',
        alignItems: 'center'
      }}>
        <button
          onClick={() => {
            handle(false);
          }}
          style={{
            marginRight:'10px',
            maxWidth: '50%',
            width: '100px',
            background: 'rgb(247,242,25)',
            color: '#000',
            border: '1px solid grey',
            cursor: 'pointer',
            fontWeight: 700,
            borderRadius: '3px'
          }}
        >Save</button>
        <button
          onClick={() => {
            handle(true);
          }}
          style={{
            maxWidth: '50%',
            width: '100px',
            background: 'rgb(103,193,41)',
            color: '#fff',
            border: '1px solid grey',
            cursor: 'pointer',
            fontWeight: 700,
            borderRadius: '3px'
          }}
        >Publish</button>
      </div>
    </div>
  )
}

export default EditorActions
