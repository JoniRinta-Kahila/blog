import React from 'react';
import { Link } from 'react-router-dom';
import ManagerMenuItems from './managerMenuItems';
import styles from './managerMenu.module.scss';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import { useLoginPopupStateContext } from '../auth/loginPopupContextProvider';
import FirebaseServices from '../../firebase/firebaseServices';

const ManagerMenu: React.FC = () => {
  const { isAdmin, user } = useFirebaseUserContext();
  const { setState } = useLoginPopupStateContext();
  const authInstance = FirebaseServices.getAuthInstance();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (event.currentTarget.innerText.toLowerCase() === 'sign out') {
      event.preventDefault();
      authInstance.signOut();
      return;
    }
    if (!isAdmin && user) {
      event.preventDefault();
      return;
    }
    if (!user) {
      setState(true);
      event.preventDefault();
      return;
    }
  }

  return (
    <div className={styles.container}>
      <h3>Management</h3>
      {
        ManagerMenuItems.map(x => {
          return (
            <span key={x.key}>
              <b>|</b>
              <Link onClick={(event => handleClick(event))} to={x.to} >{x.name}</Link>
            </span>
          )
        })
      }
    </div>
  )
}

export default ManagerMenu;
