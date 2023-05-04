import CryptoJS from "crypto-js";

export default function decryptText(
  input: string,
  secret: string = import.meta.env.VITE_INTERACTIVE_RESUME_SECRET_KEY
) {
  const bytes = CryptoJS.AES.decrypt(input, secret);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
}
