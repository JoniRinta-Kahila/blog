import React from 'react';
import styles from './sidebar.module.scss';
import ListOfLatestPosts from './listOfLatestPosts';
import ManagerMenu from './managerMenu';
import SidebarLinks from './sidebarLinks';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Page sidebar</h2>
      <ManagerMenu />
      <ListOfLatestPosts />
      <SidebarLinks />
    </div>
  )
}

export default Sidebar;
