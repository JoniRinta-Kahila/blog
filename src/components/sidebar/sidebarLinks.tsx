import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseAuthContext } from '../../firebase/context/firebaseAuthContextProvider';
import { useLoginPopupStateContext } from '../auth/loginPopupContextProvider';
import { SidebarLinksData } from './sidebarLinksData';

type SidebarLinksProps = {

}

const SidebarLinks: React.FC<SidebarLinksProps> = () => {
  const user = useFirebaseAuthContext();
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
    </div>
  )
}

export default SidebarLinks
