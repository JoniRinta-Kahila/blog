import React, { createContext, useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import SignInOrUp from './SignInOrUp';

interface AuthUpPopupState {
  popupIsOpen: boolean,
  needToSignUp: boolean,
  needToResetPwd: boolean,
  setNeedToSignUp: React.Dispatch<React.SetStateAction<boolean>>,
  setPopupIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setNeedToResetPwd: React.Dispatch<React.SetStateAction<boolean>>,
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
  const [needToResetPwd, setNeedToResetPwd] = useState<boolean>(false);
  return (
    <AuthPopupStateContext.Provider value={{
      popupIsOpen: authModalState, // boolean which determines whether the auth popup is open or closed.
      needToSignUp: needToSignUp, // if true, a registration form will be displayed in the popup window.
      needToResetPwd: needToResetPwd, // if true, a popup window will display a password reset form.
      setPopupIsOpen: setAuthModalState,
      setNeedToSignUp: setNeedToSignUp,
      setNeedToResetPwd: setNeedToResetPwd,
    }}>
      {
        authModalState 
        ? <Popup  
            children={SignInOrUp}
            contentStyle={{width:'fit-content'}} overlayStyle={{background:'rgba(0, 0, 0, 0.85)'}}
            onClose={() => { // popup is closed, resets all states
              setAuthModalState(false);
              setNeedToSignUp(false);
              setNeedToResetPwd(false);
            }}
            open={authModalState}
          />
        : null
      }
      {
        children
      }
    </AuthPopupStateContext.Provider>
  )
}

export default AuthPopupContextProvider;
