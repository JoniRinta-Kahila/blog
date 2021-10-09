import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseServices from '../../firebase/firebaseServices';
import styles from './signInOrUp.module.scss';
import { AiOutlineUser } from 'react-icons/ai';
import { BiKey } from 'react-icons/bi';
import { useAuthPopupStateContext } from './authPopupContextProvider';
import LoadingIcons from 'react-loading-icons';

interface ISignInError {
  emailErr: boolean,
  passwordErr: boolean,
  signInErr: boolean,
}

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = FirebaseServices.getAuthInstance();
  const [err, setErr] = useState<ISignInError>({emailErr: false, passwordErr: false, signInErr: false});
  const [signInOnProgress, setSignInOnProgress] = useState<boolean>(false);

  const { setNeedToSignUp, setPopupIsOpen } = useAuthPopupStateContext();

  const progressLayer = (
    <div className={styles.progressOn}>
          <LoadingIcons.ThreeDots/>
    </div>
  )

  const handleLogin = (event: React.FormEvent<HTMLInputElement>) => {
    if (!email || !password) {
      setErr({...err, emailErr: !!!email, passwordErr: !!!password})
      return;
    }

    setSignInOnProgress(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setErr({emailErr: false, passwordErr: false, signInErr: false});
        setEmail('');
        setPassword('');
        setSignInOnProgress(false);
        setPopupIsOpen(false);
      })
      .catch(() => {
        setErr({emailErr: true, passwordErr: true, signInErr: true})
        setSignInOnProgress(false);
        return event.preventDefault();
      })
  }
  
  return (
    <div className={styles.container}>


      <div className={styles.form}>

        {
          signInOnProgress
            ? progressLayer
            : null
        }

        <div className={styles.flexRow}>
          <label className={styles.label} htmlFor='email'>
            <AiOutlineUser style={{width:'12px', height:'13px'}} color='grey' />
          </label>
          <input
            id='email'
            className={styles.input}
            placeholder='Email'
            type='text'
            style={err.emailErr ? {border: '1px solid red'} : {}}
            value={email}
            onChange={(event) => {
              const newValue = event.target.value;
              setEmail(newValue)
              setErr({...err, emailErr: !!!newValue})
              console.log(err)
            }}
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
            style={err.passwordErr ? {border: '1px solid red'} : {}}
            value={password}
            onChange={(event) => {
              const newValue = event.target.value;
              setPassword(newValue);
              setErr({...err, passwordErr: !!!newValue})
            }}
          />
        </div>
        {
          err.signInErr
            ? <p style={{marginTop: 0, marginBottom: '8px', fontSize: '.8em', color: 'orangered'}}>Check your email or password</p>
            : null
        }
        <input
          className={styles.submit}
          type='submit'
          value='LOGIN'
          onClick={(event) => handleLogin(event)}
        />
        <div className={styles.actions}>
          <a href='*' onClick={(event) => {
            event.preventDefault();
            // do something
          }}>Forgot password?</a>
          <a href='*' onClick={(event) => {
            event.preventDefault();
            setNeedToSignUp(true);
          }}>Sign Up</a>
        </div>
      </div>
    </div>
  )
}

export default SignIn;
