import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import FirebaseServices from '../../firebase/firebaseServices';
import { useLoginPopupStateContext } from '../auth/loginPopupContextProvider';
import { SidebarLinksData } from './sidebarLinksData';
import styles from './sidebarLinks.module.scss';

type SidebarLinksProps = {

}

const SidebarLinks: React.FC<SidebarLinksProps> = () => {
  const { user } = useFirebaseUserContext();
  const auth = FirebaseServices.getAuthInstance();
  const { setState } = useLoginPopupStateContext();

  const SignInOrOut = useCallback(() => {
    return (
      <span>
        <b>|</b>
        <Link
          to=''
          onClick={(event) => {
            if (user) {
              auth.signOut()
            } else {
              event.preventDefault();
              setState(true)
            }
          }}
        >
          {user ? 'Sign out' : 'Sign in'}
        </Link>
      </span>
    )
  }, [auth, setState, user]);

  return (
    <div className={styles.container}>
      <h3>Subscriber?</h3>
      {
        SidebarLinksData.map(x => {
          return (
            <span key={x.key}>
              <b>|</b>
              <Link to={x.to}>{x.name}</Link>
            </span>
          )
        })
      }
      <SignInOrOut />
    </div>
  )
}

export default SidebarLinks
