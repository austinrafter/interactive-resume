export function removeRelativePathFromFilename(filename: string): string {
  const fileNameWithoutExtension = filename.split("/").pop().split(".").shift();
  if (!fileNameWithoutExtension || fileNameWithoutExtension.length === 0) {
    throw new Error(`Invalid filename: ${filename}`);
  }
  return fileNameWithoutExtension;
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
