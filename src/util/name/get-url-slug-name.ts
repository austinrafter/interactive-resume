import { removeRelativePathFromFilename } from "../string-helpers";
import kebabCase from "lodash/kebabCase";

export function getUrlSlugNameFromRelativePath(relativepath: string): string {
  return getUrlSlugName(removeRelativePathFromFilename(relativepath));
}

function getUrlSlugName(filename: string): string {
  return kebabCase(filename);
}
