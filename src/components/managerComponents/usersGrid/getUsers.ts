import FirebaseServices from '../../../firebase/firebaseServices';
import * as functions from 'firebase/functions'

export interface IUserData {
  uid: string,
  email: string,
  displayName: string,
  disabled: boolean,
  isAdmin: boolean,
  emailVerified: boolean,
}

type TdataReturn = () => Promise<functions.HttpsCallableResult<IUserData[]>>

const GetUsers = async () => {
  const fi = FirebaseServices.getFunctionsInstance();
  const action: TdataReturn = functions.httpsCallable(fi, 'getUsers', {timeout: 70000});

  const data = action() 
    .then(data => data)
  
  const result = (await data).data
  return result;
}

export default GetUsers;
