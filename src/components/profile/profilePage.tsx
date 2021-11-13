import React from 'react';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import Gravatar from '../gravatar/gravatar';
import styles from './profilePage.module.scss';

const ProfilePage: React.FC = () => {
  const { user } = useFirebaseUserContext();

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
              <td>Registered at:</td>
              <td style={{padding:'0 5px'}}>{user.metadata.creationTime}</td>
            </tr>
            <tr>
              <td>Email verified:</td>
              <td style={{padding:'0 5px'}}>{
                user.emailVerified
                ? 'True'
                : 'False'
              }</td>
              <td>{
                user.emailVerified
                ? null
                : <button onClick={() => alert('🚧🔧 You are on an unfinished site! 🔧🚧')}>Resend</button>
              }</td>
            </tr>
            <tr>
              <td>GitHub profile:</td>
              <td style={{padding:'0 5px'}}>profilelink</td>
              <td><button onClick={() => alert('🚧🔧 You are on an unfinished site! 🔧🚧')}>Update</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        
      </div>

    </div>
  )
}

export default ProfilePage;
