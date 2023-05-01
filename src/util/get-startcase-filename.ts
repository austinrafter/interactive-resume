// @TODO - unit test this
// "../../test/mock/my-cool-file.mdx" -> "MyCoolFile" ( used as JSX element <MyCoolFile /> )
export function getStartcaseFilename(filename: string): string {
  return filename
    .split("/")
    .pop()
    .split(".")
    .shift()
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}
