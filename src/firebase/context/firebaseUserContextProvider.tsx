import { onAuthStateChanged, User } from '@firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import FirebaseServices from '../firebaseServices';

interface UserContext {
  user: User|null,
  isAdmin: boolean|undefined,
}

const FirebaseUserContext = createContext<UserContext>({user: null, isAdmin: false});

export const useFirebaseUserContext = () => {
  const context = useContext(FirebaseUserContext);
  
  if (context === undefined)
    throw new Error('Call "useFirebaseUserContext" only inside a FirebaseUserContextProvider');
    
  return context;
}

const FirebaseUserContextProvider: React.FC = ({children}) => {
  const authInstance = FirebaseServices.getAuthInstance();
  const [user, setUser] = useState<User|null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean|undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, user => {
      if (user) {
        user.getIdTokenResult()
          .then(idTokenResult => {
            setUser(user);
            setIsAdmin(!!idTokenResult.claims.admin);
            console.log('EMAIL VERIFIED:', user.emailVerified)
          })
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  });

  if (!isAdmin === undefined) {
    return <p>loading..</p>
  }

  return (
    <FirebaseUserContext.Provider value={{user: user, isAdmin: isAdmin}}>
      { children }
    </FirebaseUserContext.Provider>
  )
}

export default FirebaseUserContextProvider;
