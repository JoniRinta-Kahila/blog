import React from 'react'
// import ManagerMenu from '../managerComponents/sidebar/managerMenu'
import SidebarLinks from './sidebarLinks';
import styles from './sidebar.module.scss';
import ListOfLatestPosts from './listOfLatestPosts';
import ManagerMenu from './managerMenu';

type SidebarProps = {

}

const Sidebar: React.FC<SidebarProps> = () => {
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
