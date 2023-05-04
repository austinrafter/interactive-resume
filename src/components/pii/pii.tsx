import { useContext } from "react";
import PiiContext from "./pii-context";
import decryptText from "../../util/decrypt-text";

export default function Pii(props: { pinfo: string }) {
  const _piiContext = useContext(PiiContext);
  const encrypted = _piiContext[props.pinfo];

  const secret = import.meta.env.VITE_INTERACTIVE_RESUME_SECRET_KEY;

  const decrypted = decryptText(encrypted, secret);

  return <span>{decrypted}</span>;
}
