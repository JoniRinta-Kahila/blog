import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Squares } from "react-activity";
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';

const ProtectedRoutes: React.FC = () => {
  const user = useFirebaseUserContext();

  if (user === undefined) {
    return <Squares />
  }

  if (user === null) return <Navigate to='' />;

  return <Outlet />
}

export default ProtectedRoutes;
