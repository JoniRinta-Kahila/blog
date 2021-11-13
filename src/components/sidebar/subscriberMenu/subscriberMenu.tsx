import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseUserContext } from '../../../firebase/context/firebaseUserContextProvider';
import FirebaseServices from '../../../firebase/firebaseServices';
import { SidebarLinksData } from './subscriberLinksData';
import styles from './subscriberMenu.module.scss';
import { useAuthPopupStateContext } from '../../auth/authPopupContextProvider';

const SidebarLinks: React.FC = () => {
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
              auth.signOut();
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
      <h3>
        {
          user !== null
          ? 'Account'
          : 'Subscriber?'
        }
      </h3>
      { // menu Items that are only visible to logged in users
        user !== null
        ? SidebarLinksData.filter(x => x.requireLogin).map(x => {
          return (
            <span key={x.key}>
              <b>|</b>
              <Link to={x.to}>{x.name}</Link>
            </span>
          )
        })
        :null
      }
      <SignInOrOut />
    </div>
  )
}

export default SidebarLinks;
