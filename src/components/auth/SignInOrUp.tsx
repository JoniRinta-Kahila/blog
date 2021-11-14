import React from 'react';
import { useAuthPopupStateContext } from './authPopupContextProvider';
import ResetPasswordForm from './resetPasswordForm';
import SignIn from './SignIn';
import SignUp from './signUp';

const SignInOrUp: React.FC = () => {
  const { needToSignUp, needToResetPwd } = useAuthPopupStateContext();
  
  return needToSignUp // if needToSignUp is true:
    ? <SignUp /> // display SignUp form,
    : needToResetPwd // OR if needToResetPwd is true:
      ? <ResetPasswordForm /> // Display ResetPasswordForm.
      : <SignIn /> // else, dosplay SignIn form.
}

export default SignInOrUp;
