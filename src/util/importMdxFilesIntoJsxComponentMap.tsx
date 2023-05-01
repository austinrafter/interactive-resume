import { Component } from "mdx/types";
import React from "react";
import { getJsxNameFromRelativePath } from "./get-jsx-name";
import Popout from "../components/popup";

async function waitForImportToResolveAndExtractDefaultExport([
  fileName,
  importPromise,
]): Promise<[string, Component<React.ReactNode>]> {
  const theJsxComponent: React.ReactNode = (await importPromise())
    .default as React.ReactNode;
  const jsxName: string = getJsxNameFromRelativePath(fileName);

  return [jsxName, theJsxComponent as Component<React.ReactNode>];
}

function wrapWithPopout([fileName, theMdxComponent]: [
  string,
  Component<React.ReactNode>
]): [string, Component<React.ReactNode>] {
  const popoutWrappedJsxComponent: Component<React.ReactNode> = () => (
    <Popout trigger={fileName} component={theMdxComponent as React.ReactNode} />
  );

  return [fileName, popoutWrappedJsxComponent];
}

export default async function importMdxFilesIntoJsxComponentMap() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const rawImport: Record<
        string,
        Promise<Component<React.ReactNode>>
      > = import.meta.glob("../../test/mock/*.mdx");

      const jsxNameToJsxComponentPairsPromises: Promise<
        [string, Component<React.ReactNode>]
      >[] = Object.entries(rawImport).map(
        waitForImportToResolveAndExtractDefaultExport
      );

      const jsxNameToJsxComponentPairs: [string, Component<React.ReactNode>][] =
        await Promise.all(jsxNameToJsxComponentPairsPromises);

      const popoutWrapped = jsxNameToJsxComponentPairs.map(wrapWithPopout);

      const jsxComponentMap = Object.fromEntries(popoutWrapped);

      resolve(jsxComponentMap);
    } catch (error) {
      reject(error);
    }
  });
}
