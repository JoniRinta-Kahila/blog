import { endpoints } from "../../appProperties";

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

const RegisterUser = async (email: string, displayName: string, password: string): Promise<IRegisterUserResponse> => {
  const response = await fetch(endpoints.registration, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        email: email,
        displayName: displayName,
        password: password,
      },
    }),
  });

  const responseData: IRegisterUserResponse = await response.json();
  return responseData;
};

export default RegisterUser;
