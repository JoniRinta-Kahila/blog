import React from 'react';
import { Redirect, Route, RouteProps, } from 'react-router-dom';
import { Squares } from "react-activity";
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';

interface ProtectedRouteProps extends RouteProps {

}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...rest}) => {

  const user = useFirebaseUserContext();

  if (user === undefined) {
    return <Squares />
  }

  if (user === null) return <Redirect to='' />;

  return <Route {...rest} />

}

export default ProtectedRoute;
