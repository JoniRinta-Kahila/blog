import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseAuthContext } from '../../firebase/context/firebaseUserContextProvider';
import FirebaseServices from '../../firebase/firebaseServices';
import { useLoginPopupStateContext } from '../auth/loginPopupContextProvider';
import { SidebarLinksData } from './sidebarLinksData';

type SidebarLinksProps = {

}

const SidebarLinks: React.FC<SidebarLinksProps> = () => {
  const user = useFirebaseAuthContext();
  const auth = FirebaseServices.getAuthInstance();
  const { setState } = useLoginPopupStateContext();
  return (
    <div>
      {
        SidebarLinksData.map(x => {
          return (
            <Link key={x.to} to={x.to} onClick={(event) => {
              if (x.requireLogin && !user) {
                event.preventDefault();
                setState(true)
              }
            }}>{x.name}</Link>
          )
        })
      }
      <button onClick={() => auth.signOut()}>LogOut</button>
    </div>
  )
}

export default SidebarLinks
