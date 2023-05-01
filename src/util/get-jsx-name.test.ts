import { describe, expect, test } from "vitest";
import { getJsxNameFromRelativePath } from "./get-jsx-name";

describe("getJsxNameFromRelativePath", () => {
  test("should return the correct JSX name", () => {
    const actual = getJsxNameFromRelativePath(
      "../../test/mock/my-cool-file.mdx"
    );

    expect(actual).toBe("MyCoolFile");
  });
});
