import React from 'react';
import { Route, RouteProps, } from 'react-router-dom';
// import Login from './login';
import { Squares } from "react-activity";
import { useFirebaseAuthContext } from '../../firebase/context/firebaseAuthContextProvider';

interface ProtectedRouteProps extends RouteProps {
  currentPath: string;
  // nextComponent: React.FC
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({currentPath, ...rest}) => {

  const user = useFirebaseAuthContext();

  if (user === undefined) {
    return <Squares />
  }

  if (user === null) return null;

  return <Route {...rest} />

}

export default ProtectedRoute;
