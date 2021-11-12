import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import { useAuthPopupStateContext } from './authPopupContextProvider';
import LoadingIcons from 'react-loading-icons';

type ProtectedRoutesProps = {
  requireAdmin?: boolean;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ requireAdmin = false }) => {
  const { user, isAdmin } = useFirebaseUserContext();
  const { setPopupIsOpen } = useAuthPopupStateContext();

  // if site if refreshed, wait for user information...
  if (user === undefined || isAdmin === undefined) {
    return <LoadingIcons.ThreeDots/>
  }

  // do something if the user does not have permission to use the admin panel
  if (requireAdmin && user && !isAdmin) {
    alert(`access denied, ${user.displayName}`);
    return <Navigate to='/' />
  }

  // user is not logged in, redirect user to main page and open login form
  if (!user) {
    setPopupIsOpen(true);
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default ProtectedRoutes;
