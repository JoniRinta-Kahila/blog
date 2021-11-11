import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import styles from './dashboard.module.scss';
import { Squares } from "react-activity";
import { observer } from 'mobx-react-lite';
import dev from '../../helper/devLogger';
import UsersGrid from './usersGrid/usersGrid';
import PostsGrid from './postsGrid/postsGrid';

type DashboardProps = {

}

const Dashboard: React.FC<DashboardProps> = observer(() => {
  const { isAdmin } = useFirebaseUserContext();
  
  useEffect(() => {
    dev.log('USER IS ADMIN:',isAdmin)
  }, [isAdmin])
  
  if (isAdmin === undefined) {
    return <Squares />
  }

  if (!isAdmin) {
    return <Navigate to ='' />
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <PostsGrid />
      </div>
      <div className={styles.card}>
        <PostsGrid published />
      </div>
      <div className={styles.card}>
        <UsersGrid />
      </div>
      <div className={styles.card}>
        <h1>Logs</h1>
      </div>
  </div>
  )
})

export default Dashboard;
