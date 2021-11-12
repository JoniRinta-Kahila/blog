import MD5 from 'crypto-js/md5';

const GetEmailHash = (email: string): string => {
  return MD5(email).toString();
}

export default GetEmailHash;
