import { ArrayBufferToBase64 } from "./arrayBufferToBase64";
import CryptoJS from 'crypto-js';

export const FileToMD5Hash = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const base64 = ArrayBufferToBase64(buffer);
  const md5 = CryptoJS.MD5(CryptoJS.enc.Base64.parse(base64));
  return md5.toString();
};
