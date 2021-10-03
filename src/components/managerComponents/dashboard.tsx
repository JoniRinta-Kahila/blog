import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import styles from './dashboard.module.scss';
import { useStores } from '../../mst/rootStoreContext';
import TimeAgo from '../../helper/timeElapsed';
import FirebaseServices from '../../firebase/firebaseServices';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Squares } from "react-activity";
import { observer } from 'mobx-react-lite';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';

type DashboardProps = {

}

const Dashboard: React.FC<DashboardProps> = observer(() => {
  const { isAdmin } = useFirebaseUserContext();
  const { unpublishedPosts, posts } = useStores();
  const firestore = FirebaseServices.getFirestoreInstance();
  
  useEffect(() => {
    console.log('USER IS ADMIN:',isAdmin)
  }, [isAdmin])
  
  if (isAdmin === undefined) {
    return <Squares />
  }

  if (!isAdmin) {
    return <Redirect to ='' />
  }

  /**
   * Set published state for spesific blog post.
   * @param nextState true if the post needs to be published, false if post needs to be hidden.
   * @param id firebase document id for spesific post.
   * @returns Promise<void>
   */
  const setPublished = async (nextState: boolean, id: string) => {
    const ref = doc(firestore, 'post', id);
    const data = nextState
      ? unpublishedPosts.find(x => x.id === id)
      : posts.find(x => x.id === id)
    await updateDoc(ref, {
      ...data,
      published: nextState
    })
    .then(() => console.log(id, 'UPDATED'))
    .catch(error => console.log('CANNOT UPDATE', error.message))
  }

  const handleDelete = async (postId: string, header: string) => {
    const kek = prompt('Confirm the deletion by entering the correct post header:');
    if (typeof kek === 'string' && kek === header) {
      const firestoreInstance = FirebaseServices.getFirestoreInstance();
      await deleteDoc(doc(firestoreInstance, 'post', postId));
    } else {
      alert('Cannot delete, You typed wrong header!')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Unpublished posts</h1>
        {
          <ul>
            {
              unpublishedPosts.map(x => {
                return (
                  <li key={x.id} style={{display:'flex', flexDirection:'row', alignItems:'center', height:'20px', marginBottom:'4px', width:'100%', borderBottom: '1px dotted black'}}>

                    <div title={x.header} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height:'20px'}}>
                      <button className={styles.button} onClick={() => setPublished(true, x.id)}><MdVisibilityOff /></button>
                      <p style={{padding:'4px', maxWidth:'150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{x.header}</p>
                    </div>

                      <p style={{padding:'4px', color:'yellow'}}>Unpublished</p>
                      <p style={{padding:'4px', whiteSpace: 'nowrap'}}>{TimeAgo(x.time)}</p>
                    <div style={{display: 'flex', flexDirection: 'row', float: 'right'}}>
                      <Link className={styles.button} to={`/manage/edit/${x.id}`}><BiEdit /></Link>
                      <button className={styles.button} onClick={() => handleDelete(x.id, x.header)}><RiDeleteBin6Line /></button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        }
      </div>
      <div className={styles.card}>
        <h1>Published posts</h1>
        {
          <ul>
            {
              posts.map(x => {
                return (
                  <li key={x.id} style={{display:'flex', flexDirection:'row', alignItems:'center', height:'20px', marginBottom:'4px', width:'100%', borderBottom: '1px dotted black'}}>

                    <div title={x.header} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height:'20px'}}>
                      <button className={styles.button} onClick={() => setPublished(false, x.id)}><MdVisibility /></button>
                      <p style={{padding:'4px', maxWidth:'150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{x.header}</p>
                    </div>

                      <p style={{padding:'4px', color:'yellowgreen'}}>Published</p>
                      <p style={{padding:'4px', whiteSpace: 'nowrap'}}>{TimeAgo(x.time)}</p>
                    <div style={{display: 'flex', flexDirection: 'row', float: 'right'}}>
                      <Link className={styles.button} to={`/manage/edit/${x.id}`}><BiEdit /></Link>
                      <button className={styles.button} onClick={() => handleDelete(x.id, x.header)}><RiDeleteBin6Line /></button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        }
      </div>
      <div className={styles.card}>
        <h1>User</h1>
      </div>
      <div className={styles.card}>
        <h1>Logs</h1>
      </div>
  </div>
  )
})

export default Dashboard;
