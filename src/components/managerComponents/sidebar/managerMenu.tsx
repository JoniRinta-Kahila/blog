import React from "react";
import ManagerMenuItems from './managerMenuItems';
import { Link } from 'react-router-dom';
import FirebaseServices from "../../../firebase/firebaseServices";
import { useFirebaseAuthContext } from '../../../firebase/context/firebaseUserContextProvider';

const ManagerMenu : React.FC = () => {
  const user = useFirebaseAuthContext();
  const authInstance = FirebaseServices.getAuthInstance();
  const handleLogout = () => authInstance.signOut();

  if (!user) return null;

  return (
    <div style={{ marginBottom: '15px', paddingBottom: '15px'}}>
      <h3 style={{color: 'magenta'}}>Manager tools</h3>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start', paddingLeft: '32%'}}>
        {
          ManagerMenuItems.map(item => {
            return (
              <span key={item.key} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <b style={{paddingRight: '5px', color: 'magenta'}}>|</b>
                <Link style={{textDecoration: 'none', color: 'orange', fontWeight: 700 }} to={item.to} >{item.name}</Link>
              </span>
            )
          })
        }
        <button onClick={() => handleLogout()}>Log out</button>
      </div>

    </div>
  );
};

export default ManagerMenu;
