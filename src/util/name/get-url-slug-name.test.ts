import { describe, expect, test } from "vitest";
import { getUrlSlugNameFromRelativePath } from "./get-url-slug-name";

describe("getUrlSlugNameFromRelativePath", () => {
  test("should return the correct JSX name", () => {
    const actual = getUrlSlugNameFromRelativePath(
      "../../test/mock/my-cool-file.mdx"
    );

    expect(actual).toBe("my-cool-file");
  });
});
