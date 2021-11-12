import React from 'react';
import { useFirebaseUserContext } from '../../firebase/context/firebaseUserContextProvider';
import styles from './profilePage.module.scss';

type ProfilePageProps = {

}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { user } = useFirebaseUserContext();

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileInfoCard}>
        <table>
          <tbody>
            <tr>
              <td>Profilename:</td>
                <td>{user.displayName}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Registered at:</td>
              <td>{user.metadata.creationTime}</td>
            </tr>
            <tr>
              <td>Email verified:</td>
              <td>{
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
              <td>profilelink</td>
              <td><button onClick={() => alert('🚧🔧 You are on an unfinished site! 🔧🚧')}>Update</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfilePage;
