import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import Login from './login';
import { Squares } from "react-activity";
import { useFirebaseAuthContext } from '../../firebase/context/firebaseAuthContextProvider';

const ProtectedRoute: React.FC<RouteProps> = ({...rest}) => {
  const user = useFirebaseAuthContext()
  if (user === undefined) {
    return <Squares />
  }

  return !user
    ? <Login />
    : <Route {...rest} />
}

export default ProtectedRoute;
