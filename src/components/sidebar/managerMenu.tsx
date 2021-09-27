import React from 'react';
import { Link } from 'react-router-dom';
import ManagerMenuItems from './managerMenuItems';
import styles from './managerMenu.module.scss';

type ManagerMenuProps = {

}

const ManagerMenu: React.FC<ManagerMenuProps> = () => {
  return (
    <div className={styles.container}>
      <h3>Management</h3>
      {
        ManagerMenuItems.map(x => {
          return (
            <span key={x.key}>
              <b>|</b>
              <Link to={x.to} >{x.name}</Link>
            </span>
          )
        })
      }
    </div>
  )
}

export default ManagerMenu;
