import CryptoJS from "crypto-js";

export default function encryptText(
  input: string,
  secret: string = process.env.INTERACTIVE_RESUME_SECRET_KEY
) {
  const ciphertext = CryptoJS.AES.encrypt(input, secret).toString();
  return ciphertext;
}
