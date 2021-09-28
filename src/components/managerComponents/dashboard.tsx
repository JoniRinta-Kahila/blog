import React from 'react';
import { Redirect } from 'react-router-dom';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import styles from './dashboard.module.scss';
import { useStores } from '../../mst/rootStoreContext';
import TimeAgo from '../../helper/timeElapsed';

type DashboardProps = {

}

const Dashboard: React.FC<DashboardProps> = () => {
  const { isAdmin } = useFirebaseUserContext();
  const { unpublishedPosts, posts } = useStores();
  
  if (!isAdmin) {
    return <Redirect to ='' />
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
                  <li key={x.time} style={{display:'flex', flexDirection:'row', alignItems:'center', height:'20px', marginBottom:'4px'}}>
                    <p style={{padding:'4px'}}>{x.caption}</p>
                    <p style={{padding:'4px', color:'yellow'}}>Unpublished</p>
                    <p style={{padding:'4px'}}>{TimeAgo(x.time)}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                    <button>Publish</button>
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
                  <li key={x.time} style={{display:'flex', flexDirection:'row', alignItems:'center', height:'20px', marginBottom:'4px'}}>
                    <p style={{padding:'4px'}}>{x.caption}</p>
                    <p style={{padding:'4px', color:'yellow'}}>Unpublished</p>
                    <p style={{padding:'4px'}}>{TimeAgo(x.time)}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                    <button>Unpublish</button>
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
}

export default Dashboard;
