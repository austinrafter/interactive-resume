import CryptoJS from "crypto-js";

export default function encryptText(
  input: string,
  secret: string = import.meta.env.VITE_INTERACTIVE_RESUME_SECRET_KEY
) {
  const ciphertext = CryptoJS.AES.encrypt(input, secret).toString();
  return ciphertext;
}
