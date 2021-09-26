import React from 'react';
import { Route, RouteProps, } from 'react-router-dom';
import { Squares } from "react-activity";
import { useFirebaseAuthContext } from '../../firebase/context/firebaseAuthContextProvider';

interface ProtectedRouteProps extends RouteProps {

}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...rest}) => {

  const user = useFirebaseAuthContext();

  if (user === undefined) {
    return <Squares />
  }

  if (user === null) return null;

  return <Route {...rest} />

}

export default ProtectedRoute;
