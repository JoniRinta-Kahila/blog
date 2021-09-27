import { onAuthStateChanged, User } from '@firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import FirebaseServices from '../firebaseServices';

interface UserContext {
  user: User|null,
  isAdmin: boolean,
}

const FirebaseUserContext = createContext<UserContext>({user: null, isAdmin: false});

export const useFirebaseUserContext = () => {
  const context = useContext(FirebaseUserContext);
  
  if (context === undefined)
    throw new Error('Call "useFirebaseAuthContext" only inside a FirebaseAuthContextProvider');
    
  return context;
}

const FirebaseUserContextProvider: React.FC = ({children}) => {
  const authInstance = FirebaseServices.getAuthInstance();
  const [user, setUser] = useState<User|null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, user => {
      if (user) {
        user.getIdTokenResult()
          .then(idTokenResult => {
            setIsAdmin(!!idTokenResult.claims.admin);
          })
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  });

  return (
    <FirebaseUserContext.Provider value={{user: user, isAdmin: isAdmin}}>
      { children }
    </FirebaseUserContext.Provider>
  )
}

export default FirebaseUserContextProvider;
