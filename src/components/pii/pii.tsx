import { useContext, useEffect, useState } from "react";
import PiiContext from "./pii-context";
import decryptText from "../../util/decrypt-text";

export default function Pii(props: { pinfo: string }) {
  const _piiContext = useContext(PiiContext);
  const encrypted = _piiContext[props.pinfo as keyof typeof _piiContext];

  const [password, setPassword] = useState<string>();

  const search = new URLSearchParams(window.location.search);

  const secret = search.get("password"); //|| import.meta.env.VITE_INTERACTIVE_RESUME_SECRET_KEY;

  useEffect(() => {
    if (secret && secret.length) {
      setPassword(secret);
    }
  }, [secret]);

  if (!password) {
    return <span> </span>;
  }
  const decrypted = decryptText(encrypted, password);

  return <span>{decrypted}</span>;
}
