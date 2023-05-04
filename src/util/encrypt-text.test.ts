import { describe, expect, test } from "vitest";
import encryptText from "./encrypt-text";
import decryptText from "./decrypt-text";

describe("encryptText and decryptText", () => {
  test("Should encrypt and decrypt the text", () => {
    const actual = encryptText("Text", "sillypassword");

    expect(decryptText(actual, "sillypassword")).toBe("Text");
  });
});
