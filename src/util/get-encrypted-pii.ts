import encryptText from "./encrypt-text";
import pii from "../../pii.json";

export default Object.fromEntries(
  Object.entries(pii).map((entry: [string, string]) => [
    entry[0],
    encryptText(entry[1]),
  ])
);
