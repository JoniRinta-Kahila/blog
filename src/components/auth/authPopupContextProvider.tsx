import React, { createContext, useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import SignInOrUp from './SignInOrUp';

interface AuthUpPopupState {
  popupIsOpen: boolean,
  needToSignUp: boolean,
  setNeedToSignUp: React.Dispatch<React.SetStateAction<boolean>>,
  setPopupIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const AuthPopupStateContext = createContext<AuthUpPopupState|undefined>(undefined);

export const useAuthPopupStateContext = () => {
  const context = useContext(AuthPopupStateContext);

  if (context === undefined) {
    throw new Error('Call "useSignInPopupStateContext" only inside a AuthPopupContextProvider');
  }

  return context;
};

const AuthPopupContextProvider: React.FC = ({children}) => {
  const [authModalState, setAuthModalState] = useState<boolean>(false);
  const [needToSignUp, setNeedToSignUp] = useState<boolean>(false);
  return (
    <AuthPopupStateContext.Provider value={{
      popupIsOpen: authModalState,
      needToSignUp: needToSignUp,
      setPopupIsOpen: setAuthModalState,
      setNeedToSignUp: setNeedToSignUp,
    }}>
      {
        authModalState 
        ? <Popup  
            children={SignInOrUp}
            contentStyle={{width:'fit-content'}} overlayStyle={{background:'rgba(0, 0, 0, 0.85)'}}
            onClose={() => {
              setAuthModalState(false);
              setNeedToSignUp(false);
            }}
            open={authModalState}
          />
        : null
      }
      {children}
    </AuthPopupStateContext.Provider>
  )
}

export default AuthPopupContextProvider
