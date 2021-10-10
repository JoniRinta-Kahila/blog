import React, { useEffect } from 'react';
import { useAuthPopupStateContext } from './authPopupContextProvider';

type WelcomeProps = {

}

const Welcome: React.FC<WelcomeProps> = () => {
  const { setPopupIsOpen } = useAuthPopupStateContext();

  useEffect(() => setPopupIsOpen(false), [setPopupIsOpen])

  return (
    <div style={{display: 'flex', flexDirection:'column', justifySelf: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <h2>Your user is created!</h2>
      <h3>We sent a confirmation link to your email. You will need to verify your email to access all features.</h3>
    </div>
  )
}

export default Welcome;
