import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import styles from './dashboard.module.scss';
import { useStores } from '../../mst/rootStoreContext';
import TimeAgo from '../../helper/timeElapsed';
import FirebaseServices from '../../firebase/firebaseServices';
import { doc, updateDoc } from "firebase/firestore";
import { Squares } from "react-activity";
import { observer } from 'mobx-react-lite';

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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Unpublished posts</h1>
        {
          <ul>
            {
              unpublishedPosts.map(x => {
                return (
                  <li key={x.id} style={{display:'flex', flexDirection:'row', alignItems:'center', height:'20px', marginBottom:'4px'}}>
                    <p style={{padding:'4px'}}>{x.header}</p>
                    <p style={{padding:'4px', color:'yellow'}}>Unpublished</p>
                    <p style={{padding:'4px'}}>{TimeAgo(x.time)}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                    <button onClick={() => setPublished(true, x.id)}>Publish</button>
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
                  <li key={x.id} style={{display:'flex', flexDirection:'row', alignItems:'center', height:'20px', marginBottom:'4px', margin:'5px', borderBottom:'1px dotted black'}}>
                    <p style={{padding:'4px'}}>{x.header}</p>
                    <p style={{padding:'4px', color:'greenyellow'}}>Published</p>
                    <p style={{padding:'4px'}}>{TimeAgo(x.time)}</p>
                    <div style={{float:'right'}}>
                      <button>Edit</button>
                      <button>Delete</button>
                      <button onClick={() => setPublished(false, x.id)}>Unpublish</button>
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
