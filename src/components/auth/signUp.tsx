import React, { useState } from 'react';
import styles from './signInOrUp.module.scss';
import { AiOutlineUser, AiOutlineSecurityScan } from 'react-icons/ai';
import { BiKey } from 'react-icons/bi';
import { useAuthPopupStateContext } from './authPopupContextProvider';
import { sendEmailVerification, signInWithEmailAndPassword } from '@firebase/auth';
import FirebaseServices from '../../firebase/firebaseServices';
import LoadingIcons from 'react-loading-icons';
import RegisterUser from './registerUser';
import { MdAlternateEmail } from 'react-icons/md';
import { Navigate } from 'react-router-dom';
import EmailVerificationOptions from './emailVerificationOptions';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [regReady, setRegReady] = useState<boolean>(false);
  const [regOnProgress, setRegOnProgress] = useState<boolean>(false);

  const { setNeedToSignUp } = useAuthPopupStateContext();

  const progressLayer = (
    <div className={styles.progressOn}>
      <LoadingIcons.ThreeDots/>
    </div>
  )
  
  const ai = FirebaseServices.getAuthInstance();

  const handleSignUp = async () => {
    if (!email || !username || !password || password !== passwordRepeat) {
      alert('cant send');
      return;
    }

    setRegOnProgress(true);

    const uid = await RegisterUser(email, username, password)
      .then(response => {
        if (response.error) {
          const signUpError = Error();
          signUpError.message = response.error.message;
          signUpError.name = response.error.status;
          return console.error(signUpError);
        }
        if (!response.data) {
          return console.error(response);
        }

        return response.data.uid;
      });

    if (typeof uid === 'string') { // user is created
      const firstSignIn = await signInWithEmailAndPassword(ai, email, password);
      sendEmailVerification(firstSignIn.user, EmailVerificationOptions)
        .then(() => {
          setRegOnProgress(false);
          setRegReady(true);
          ai.signOut();
        })
        .catch((err) => console.error(err));
    } else {
      // some error was happened;
      setRegOnProgress(false);
    }
  }

  if (regReady) {
    return <Navigate to='/welcome' />
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {
          regOnProgress
            ? progressLayer
            : null
        }
        <div className={styles.flexRow}>
          <label className={styles.label} htmlFor='email'>
            <MdAlternateEmail style={{width:'12px', height:'13px'}} color='grey' />
          </label>
          <input
            id='email'
            className={styles.input}
            placeholder='Email'
            type='text'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={styles.flexRow}>
          <label className={styles.label} htmlFor='username'>
            <AiOutlineUser style={{width:'12px', height:'13px'}} color='grey' />
          </label>
          <input
            id='username'
            className={styles.input}
            placeholder='Username'
            type='text'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className={styles.flexRow}>
          <label className={styles.label} htmlFor='password'>
            <BiKey style={{width:'15px', height:'15px'}} color='grey' />
          </label>
          <input
            id='password'
            className={styles.input}
            placeholder='Password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className={styles.flexRow}>
          <label className={styles.label} htmlFor='passwordRep'>
            <AiOutlineSecurityScan style={{width:'15px', height:'15px'}} color='grey' />
          </label>
          <input
            id='passwordRep'
            className={styles.input}
            placeholder='Repeat password'
            type='password'
            value={passwordRepeat}
            onChange={(event) => setPasswordRepeat(event.target.value)}
          />
        </div>
        <input
          className={styles.submit}
          type='submit'
          value='SIGNUP'
          onClick={() => handleSignUp()}
        />
        <div className={styles.actions}>
          <a href='*' onClick={(event) => {
            event.preventDefault();
            setNeedToSignUp(false);
          }}>Sign in</a>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
