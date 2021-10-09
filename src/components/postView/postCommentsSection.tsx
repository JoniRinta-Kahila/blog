import React, { useEffect, useState } from 'react';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import FirebaseServices from '../../firebase/firebaseServices';
import TimeAgo from '../../helper/timeElapsed';
import styles from './postCommentsSection.module.scss';
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";
import dev from '../../helper/devLogger';

type PostCommentsSectionProps = {
  showNMessageOnDefault?: number,
  showNMessagesMore?: number
  postId: string
}

interface ICommentData {
  id: string
  uid: string
  mid: string
  time: number
  sender: string
  message: string
}

const PostCommentsSection: React.FC<PostCommentsSectionProps> = ({showNMessageOnDefault = 5, showNMessagesMore = 5, postId}) => {

  const { user } = useFirebaseUserContext();
  const [rowsDisplay, setRowsDisplay] = useState<number>(showNMessageOnDefault);
  const [newMessage, setNewMessage] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('\nLogin to comment');
  const [commentsData, setCommentsData] = useState<ICommentData[]>([]);
  
  useEffect(() => {
    const firestoreInstance = FirebaseServices.getFirestoreInstance();
    const q = query(collection(firestoreInstance, 'postcomments'), where('mid', '==', postId));
    dev.log('settin up comment listener...')
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      dev.log('Fetch new comments');
      const data = querySnapshot.docs.map(x => {
        let row = x.data()
        row.id = x.id;
        return row as ICommentData;
      });

      setCommentsData(data.sort((a,b) => b.time - a.time));
    });

    return () => unsubscribe();
  }, [postId]);

  useEffect(() => {
    if (!user) {
      setPlaceholder('\nLogin to comment');
      return;
    }

    if (user && !user.emailVerified) {
      setPlaceholder('\nPleace, Verify your email to comment');
      return;
    }

    setPlaceholder('');

  }, [user]);

  const showMore = () => {
    setRowsDisplay(rowsDisplay + showNMessagesMore)
  };

  const showLess = () => {
    setRowsDisplay(showNMessageOnDefault)
  };

  const postComment = async () => {
    if (!user || !user.emailVerified) {
      console.warn('EMAIL VERIFICATION IS REQUIRED TO COMMENT');
      return;
    }

    if (!newMessage) {
      console.warn('MESSAGE IS REQUIRED');
      return;
    }

    const firestoreInstance = FirebaseServices.getFirestoreInstance();
    addDoc(collection(firestoreInstance, 'postcomments'), {
      uid: user.uid,
      mid: postId,
      time: new Date().getTime(),
      sender: user.displayName,
      message: newMessage,
    })
    .then(() => setNewMessage(''))
    .catch((err) => console.error(err));
  }

  return (
    <div className={styles.container}>
      <h2>Discussion</h2>
      {
        commentsData.slice(0, rowsDisplay).map(x => {
          return (
            <div key={x.id} className={styles.messagebox}>
              <span className={styles.messageInfo}>
                <h4>{x.sender}</h4>
                <h5>{TimeAgo(x.time)}</h5>
              </span>
              <p>{x.message}</p>
            </div>
          )
        })
      }
      {
        commentsData.length < 1
          ? <div className={styles.messagebox}>
              <h3 style={{textAlign: 'center', color: 'silver'}}>Be the first to comment.</h3>
            </div>
          : null
      }
      <div className={styles.showMoreLess}>
        <h3>Comment post</h3>
        {
          rowsDisplay > showNMessageOnDefault
            ? <button onClick={() => showLess()}>Show less</button>
            : null
        }
        {
          rowsDisplay < commentsData.length
            ? <button onClick={() => showMore()}>Show more</button>
            : null
        }
      </div>

      <div className={styles.newMessage}>
        <textarea 
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          rows={user?.emailVerified ? 4 : 3}
          disabled={!user?.emailVerified}
          placeholder={placeholder}
          style={user?.emailVerified ? {} : {textAlign: 'center', fontSize: '25px'}}
        />
        <button
          disabled={!user}
          onClick={() => postComment()}
        >
          Send
        </button>
      </div>

    </div>
  )
}

export default PostCommentsSection;
