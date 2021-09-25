import { onAuthStateChanged, User } from '@firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import FirebaseServices from '../firebaseServices';

const FirebaseAuthContext = createContext<User|null>(null);

export const useFirebaseAuthContext = () => {
  const context = useContext(FirebaseAuthContext);
  
  if (context === undefined)
    throw new Error('Call "useFirebaseAuthContext" only inside a FirebaseAuthContextProvider');
  
  return context;
}

const FirebaseAuthContextProvider: React.FC = ({children}) => {
  const authInstance = FirebaseServices.getAuthInstance();
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  });

  return (
    <FirebaseAuthContext.Provider value={user}>
      { children }
    </FirebaseAuthContext.Provider>
  )
}

export default FirebaseAuthContextProvider;
