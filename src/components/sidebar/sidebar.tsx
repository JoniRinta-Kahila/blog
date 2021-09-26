import React from 'react'
import ManagerMenu from '../managerComponents/sidebar/managerMenu'
import SidebarLinks from './sidebarLinks';
import styles from './sidebar.module.scss';

type SidebarProps = {

}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className={styles.container}>
      <h2>Page sidebar</h2>
      <SidebarLinks />
      <ManagerMenu />
    </div>
  )
}

export default Sidebar
