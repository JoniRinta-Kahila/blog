import React, { useState } from 'react';
import styles from './signInOrUp.module.scss';
import LoadingIcons from 'react-loading-icons';
import { MdAlternateEmail } from 'react-icons/md';
import dev from '../../helper/devLogger';
import { useAuthPopupStateContext } from './authPopupContextProvider';
import { getAuth, sendPasswordResetEmail } from "@firebase/auth";

const progressLayer = (
  <div className={styles.progressOn}>
    <LoadingIcons.ThreeDots/>
  </div>
)

const ResetPasswordForm: React.FC = () => {
  const [rstPwdInProgress, setRstPwdInProgress] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [err, setErr] = useState<string>(''); // TODO: create email validation
  const { setNeedToSignUp, setPopupIsOpen, setNeedToResetPwd } = useAuthPopupStateContext();

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setErr('Email is not a valid'); // TODO: create email validation
      return;
    }

    // email is valid
    setRstPwdInProgress(true);

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setRstPwdInProgress(false); // reset mail send success
        setPopupIsOpen(false); // close popup
      })
      .catch(err => {
        console.error('Cannot send reset email:', err.message);
        setErr(err.message);
        setRstPwdInProgress(false);
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {
          rstPwdInProgress
            ? progressLayer
            : null
        }
        <form onSubmit={(event) => handleReset(event)}>
        <div className={styles.flexRow}>
          <label className={styles.label} htmlFor='email'>
            <MdAlternateEmail style={{width:'12px', height:'13px'}} color='grey' />
          </label>
          <input
            id='email'
            className={styles.input}
            placeholder='Email'
            type='text'
            style={err ? {border: '1px solid red'} : {}}
            value={email}
            onChange={(event) => {
              const newValue = event.target.value;
              setEmail(newValue)
              dev.log(err)
            }}
          />
        </div>
        <button
          className={styles.submit}
          type='submit'
          value='LOGIN'
        >Reset</button>
        </form>
        <div className={styles.actions}>
          <a href='*' onClick={(event) => {
            event.preventDefault();
            setNeedToResetPwd(false);
          }}>Sign In</a>
          <a href='*' onClick={(event) => {
            event.preventDefault();
            setNeedToSignUp(true);
          }}>Sign Up</a>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordForm
