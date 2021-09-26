import React, { createContext, useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import Login from './login';

interface LoginPopupState {
  open: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
}

const LoginPopupStateContext = createContext<LoginPopupState>(
  {
    open: false,
    setState: () => console.log('Call "useFirebaseAuthContext" only inside a FirebaseAuthContextProvider'),
  }
);

export const useLoginPopupStateContext = () => useContext(LoginPopupStateContext);

const LoginPopupContextProvider: React.FC = ({children}) => {

  const [loginModalState, setLoginModalState] = useState<boolean>(false);

  return (
    <LoginPopupStateContext.Provider value={{
      open: loginModalState,
      setState: setLoginModalState,
    }}>
      <Popup  
        children={Login}
        contentStyle={{width:'fit-content'}} overlayStyle={{background:'rgba(0, 0, 0, 0.85)'}}
        onClose={() => {
          setLoginModalState(false)
        }}
        open={loginModalState}
      />
      { children }
    </LoginPopupStateContext.Provider>
  )
}

export default LoginPopupContextProvider;
