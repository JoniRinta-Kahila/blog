import React, { useEffect } from 'react';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import styles from './dashboard.module.scss';
import LoadingIcons from 'react-loading-icons';
import { observer } from 'mobx-react-lite';
import dev from '../../helper/devLogger';
import UsersGrid from './usersGrid/usersGrid';
import PostsGrid from './postsGrid/postsGrid';

const Dashboard: React.FC = observer(() => {
  const { isAdmin } = useFirebaseUserContext();
  

  useEffect(() => {
    dev.log('USER IS ADMIN:',isAdmin)
  }, [isAdmin])
  
  if (isAdmin === undefined) {
    return <LoadingIcons.Circles />
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
