import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseServices from '../../firebase/firebaseServices';
import styles from './signInOrUp.module.scss';
import { AiOutlineUser } from 'react-icons/ai';
import { BiKey } from 'react-icons/bi';
import { useAuthPopupStateContext } from './authPopupContextProvider';


const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = FirebaseServices.getAuthInstance();

  const { setNeedToSignUp, setPopupIsOpen } = useAuthPopupStateContext();

  const handleLogin = (event: React.FormEvent<HTMLInputElement>) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setPopupIsOpen(false);
      })
      .catch(error => {
        console.log(error.code, error.message);
        return event.preventDefault();
      })
  }
  
  return (
    <div className={styles.container}>

      <div className={styles.form}>
        <div className={styles.flexRow}>
          <label className={styles.label} htmlFor='email'>
            <AiOutlineUser style={{width:'12px', height:'13px'}} color='grey' />
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
        <input
          className={styles.submit}
          type='submit'
          value='LOGIN'
          onClick={(event) => handleLogin(event)}
        />
        <a href='*' onClick={(event) => {
          event.preventDefault();
          setNeedToSignUp(true);
        }}>Sign Up</a>
      </div>
    </div>
  )
}

export default SignIn;
