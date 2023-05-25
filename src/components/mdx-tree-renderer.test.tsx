import { describe, expect, test, vitest } from "vitest";
import { render } from "@testing-library/react";
import { scrollToHeader } from "../util/dom-manipulation/scroll-to-header";
import MdxTreeRenderer from "./mdx-tree-renderer";

const SCROLL = "dog";
vitest.mock("../util/dom-manipulation/scroll-to-header", () => ({
  scrollToHeader: vitest.fn(),
}));

vitest.mock("react-router-dom", () => ({
  ...vitest.importActual("react-router-dom"),
  useLocation: vitest.fn(() => ({
    search: { scroll: SCROLL },
  })),
}));

describe("mdxTreeRenderer", () => {
  test("it scrolls to the header", function () {
    render(<MdxTreeRenderer />);

    expect(scrollToHeader).toHaveBeenCalledWith(SCROLL);
  });
});
