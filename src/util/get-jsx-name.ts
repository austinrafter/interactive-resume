// @TODO - unit test this
// "../../test/mock/my-cool-file.mdx" -> "MyCoolFile" ( used as JSX element <MyCoolFile /> )
import startCase from "lodash/startCase";
import camelCase from "lodash/camelCase";

function removeRelativePathFromFilename(filename: string): string {
  return filename.split("/").pop().split(".").shift()!;
}

export function getJsxNameFromRelativePath(relativepath: string): string {
  return getJsxName(removeRelativePathFromFilename(relativepath));
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getJsxName(filename: string): string {
  return capitalizeFirstLetter(camelCase(filename));
}
