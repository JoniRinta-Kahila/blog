import React from 'react';
import styles from './sidebar.module.scss';
import ListOfLatestPosts from './listOfLatestPosts';
import ManagerMenu from './managerMenu';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Page sidebar</h2>
      <ManagerMenu />
      <ListOfLatestPosts />
    </div>
  )
}

export default Sidebar;
