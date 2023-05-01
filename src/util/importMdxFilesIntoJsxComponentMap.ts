import { Component } from "mdx/types";
import React from "react";
import { getJsxNameFromRelativePath } from "./get-jsx-name";

async function waitForImportToResolveAndExtractDefaultExport([
  fileName,
  importPromise,
]): Promise<[string, Component<React.ReactNode>]> {
  const theJsxComponent: Component<React.ReactNode> = (await importPromise())
    .default as Component<React.ReactNode>;
  const jsxName: string = getJsxNameFromRelativePath(fileName);
  return [jsxName, theJsxComponent];
}

export default async function importMdxFilesIntoJsxComponentMap() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const rawImport: Record<
        string,
        Promise<Component<React.ReactNode>>
      > = import.meta.glob("../../test/mock/*.mdx");

      const jsxNameToJsxComponentPairsPromises = Object.entries(rawImport).map(
        waitForImportToResolveAndExtractDefaultExport
      );

      const jsxNameToJsxComponentPairs = await Promise.all(
        jsxNameToJsxComponentPairsPromises
      );

      const jsxComponentMap = Object.fromEntries(jsxNameToJsxComponentPairs);

      resolve(jsxComponentMap);
    } catch (error) {
      reject(error);
    }
  });
}
