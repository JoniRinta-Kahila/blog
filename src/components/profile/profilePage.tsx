import React, { useState } from 'react';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import Gravatar from '../gravatar/gravatar';
import { SendEmailVerification } from './profileActions';
import styles from './profilePage.module.scss';

const ProfilePage: React.FC = () => {
  const { user } = useFirebaseUserContext();
  const [emailVerificationIsSend, setEmailVerificationIsSend]
    = useState<boolean>(false);

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.container}>

      <div className={styles.profileImg}>
        <Gravatar round className={styles.gravatar} email={user.email!} size='200' />
      </div>

      <div className={styles.profileInfoCard}>
        <table>
          <tbody>
            <tr>
              <td>Profilename:</td>
                <td>{user.displayName}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td style={{padding:'0 5px'}}>{user.email}</td>
            </tr>
            <tr>
              <td>Email verified:</td>
              <td style={{padding:'0 5px'}}>{
                user.emailVerified
                ? 'True'
                : 'False'
              }</td>
              <td>{
                user.emailVerified || emailVerificationIsSend
                ? null
                : <button onClick={() => {
                  SendEmailVerification(user)
                    .then(x => setEmailVerificationIsSend(x));
                }}>Resend</button>
              }</td>
            </tr>
            <tr>
              <td>Registered at:</td>
              <td style={{padding:'0 5px'}}>{user.metadata.creationTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfilePage;
