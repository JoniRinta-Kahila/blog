import React from 'react';
import { Redirect } from 'react-router-dom';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import styles from './dashboard.module.scss';

type DashboardProps = {

}

const Dashboard: React.FC<DashboardProps> = () => {
  const { isAdmin } = useFirebaseUserContext();
  
  if (!isAdmin) {
    return <Redirect to ='' />
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>ONE</div>
      <div className={styles.card}>TWO</div>
      <div className={styles.card}>THREE</div>
      <div className={styles.card}>FOUR</div>
  </div>
  )
}

export default Dashboard;
