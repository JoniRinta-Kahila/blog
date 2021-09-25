import { User } from '@firebase/auth';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import Login from './login';
import { Squares } from "react-activity";
interface ProtectedRouteProps extends RouteProps {
  user: User|null,
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({user, ...rest}) => {

  if (user === undefined) {
    return <Squares />
  }

  return !user
    ? <Login user={user} />
    : <Route {...rest} />
}

export default ProtectedRoute;
