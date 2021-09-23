import { onAuthStateChanged, User } from '@firebase/auth';
import React, { useEffect, useState } from 'react'
import { Route, RouteProps } from 'react-router-dom'
import Login from './login';
import { Squares } from "react-activity";
import FirebaseServices from '../../firebase/firebaseServices';
interface ProtectedRouteProps extends RouteProps {

}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({...rest}) => {
  const auth = FirebaseServices.getAuthInstance();
  const [user, setUser] = useState<User|null|undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  })

  if (user === undefined) {
    return <Squares />
  }

  return !user
    ? <Login user={user} />
    : <Route {...rest} />
}

export default ProtectedRoute;
