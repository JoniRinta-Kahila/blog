import React from 'react';
import { useAuthPopupStateContext } from './authPopupContextProvider';
import SignIn from './SignIn';
import SignUp from './signUp';

const SignInOrUp: React.FC = () => {
  const { needToSignUp } = useAuthPopupStateContext();
  
  return needToSignUp
    ? <SignUp />
    : <SignIn />
}

export default SignInOrUp
