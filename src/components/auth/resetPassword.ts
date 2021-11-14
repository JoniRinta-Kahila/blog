import { getAuth, sendPasswordResetEmail } from "@firebase/auth";

const SendPasswordResetEmail = (email: string) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email)
    .then(() => true)
    .catch(err => {
      console.error('Cannot send reset email:', err.message);
      return false;
    });
};

export default SendPasswordResetEmail;
