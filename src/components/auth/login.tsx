import { signInWithEmailAndPassword, User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import FirebaseServices from '../../firebase/firebaseServices';

type LoginProps = {
  user: User|null
}

const Login: React.FC<LoginProps> = ({ user }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const auth = FirebaseServices.getAuthInstance();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => console.log('logged in', userCredential))
      .catch(error => console.log(error.code, error.message))
  }

  useEffect(() => {
    console.log(user)
  }, [user])
  return user
  ? (
    <div>
      Logged in
    </div>
  )
  : (
    <div>
      <label>
        Email:
        <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type='submit' value='LogIn' onClick={() => handleLogin()}/>
    </div>
  )
}

export default Login
