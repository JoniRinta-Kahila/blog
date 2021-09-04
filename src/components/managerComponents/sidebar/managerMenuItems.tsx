// import React from "react";
import styles from './managerMenu.module.scss';

interface IManagerMenuItem {
    name: string
    to: string
    className: string
    key: number
}

const ManagerMenuItems: IManagerMenuItem[] = [
    {
      name: 'Editor',
      to: '/editor',
      className: styles.managerMenuItem,
      key: 1,
    },
    {
      name: 'All Posts',
      to: '',
      className: styles.managerMenuItem,
      key: 2,
    }, 
    {
      name: 'Account',
      to: '',
      className: styles.managerMenuItem,
      key: 3,
    },
    {
      name: 'Logout',
      to: '',
      className: styles.managerMenuItem,
      key: 4,
    }
]

export default ManagerMenuItems;