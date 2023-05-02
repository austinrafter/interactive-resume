// @TODO - unit test this
// "../../test/mock/my-cool-file.mdx" -> "MyCoolFile" ( used as JSX element <MyCoolFile /> )
import camelCase from "lodash/camelCase";

function removeRelativePathFromFilename(filename: string): string {
  const fileNameWithoutExtension = filename.split("/").pop().split(".").shift();
  if (!fileNameWithoutExtension || fileNameWithoutExtension.length === 0) {
    throw new Error(`Invalid filename: ${filename}`);
  }
  return fileNameWithoutExtension;
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
