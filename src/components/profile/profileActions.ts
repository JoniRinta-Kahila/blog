import { sendEmailVerification, User } from '@firebase/auth';
import EmailVerificationOptions from '../auth/emailVerificationOptions';
import { getAuth, updateProfile } from "firebase/auth";

/**
 * Send Email verification
 * @param user User
 * @returns boolean
 */
export const SendEmailVerification = (user: User) =>
  sendEmailVerification(user, EmailVerificationOptions)
    .then(() => true)
    .catch(err => {
      console.error('Cannot send email verification', err.message);
      return false;
    });

/**
 * Update user profile information
 * @param user Current user: User
 * @param displayName string?
 * @param photoURL string?
 * @returns boolean
 */
export const UpdateProfile = (
  user: User,
  displayName = user.displayName!,
  photoURL = user.photoURL,
  ) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (user && currentUser === user) {
      return updateProfile(currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      })
      .then(() => true)
      .catch(err => {
        console.error('Cannot update profile', err.message);
        return false;
      });
    }
    return false;
};
