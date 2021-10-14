import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseUserContext } from '../../../firebase/context/firebaseUserContextProvider';
import FirebaseServices from '../../../firebase/firebaseServices';
import { SidebarLinksData } from './subscriberLinksData';
import styles from './subscriberMenu.module.scss';
import { useAuthPopupStateContext } from '../../auth/authPopupContextProvider';

type SidebarLinksProps = {

}

const SidebarLinks: React.FC<SidebarLinksProps> = () => {
  const { user } = useFirebaseUserContext();
  const auth = FirebaseServices.getAuthInstance();
  const { setPopupIsOpen } = useAuthPopupStateContext();

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
              setPopupIsOpen(true);

            }
          }}
        >
          {user ? 'Sign out' : 'Sign in'}
        </Link>
      </span>
    )
  }, [auth, setPopupIsOpen, user]);

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
