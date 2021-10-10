import * as functions from 'firebase/functions'
import FirebaseServices from "../../firebase/firebaseServices";

export interface IRegisterUserProps {
  email: string,
  displayName: string,
  password: string,
}

export interface IRegisterUserResponse {
  data?: {
    process: string,
    uid: string,
  },
  error?: {
    status: string,
    message: string,
  }
}

type Tdata = IRegisterUserProps | null | undefined
type TdataReturn = (data: Tdata) => Promise<functions.HttpsCallableResult<unknown>>

const RegisterUser = (email: string, displayName: string, password: string): Promise<IRegisterUserResponse> => {

  const functionsInstance = FirebaseServices.getFunctionsInstance();
  const registration: TdataReturn = functions.httpsCallable<IRegisterUserProps>(functionsInstance, 'userRegistration', {timeout: 70000})

  const response: Promise<IRegisterUserResponse> = registration({
    email: email,
    displayName: displayName,
    password: password,
  })
    .then((response) => response)
    .catch((err) => err)

  return response;
};

export default RegisterUser;
