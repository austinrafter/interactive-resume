import { Component } from "mdx/types";
import React from "react";
import { getJsxNameFromRelativePath } from "./get-jsx-name";
import Popout from "../components/popout";

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

  return [`${fileName}Popout`, popoutWrappedJsxComponent];
}

type ComponentWithMetadata<U> = U & { meta: { title: string } };
function addMetaDataToComponentMap<
  ComponentType extends Component<React.ReactNode>
>(
  componentMap: Record<string, ComponentType>
): ComponentWithMetadata<ComponentType> {
  return Object.entries(componentMap).reduce(
    (
      acc,
      [key, value]: [string, ComponentType]
    ): ComponentWithMetadata<ComponentType> => {
      const newValue = value;
      (newValue as ComponentWithMetadata<ComponentType>).meta = { title: key };
      return {
        ...acc,
        [key]: newValue,
      };
    },
    {} as ComponentWithMetadata<ComponentType>
  );
}

type ReturnType = Record<string, Component<React.ReactNode>>;

/**
 * Imports all .mdx files in the src/mdx-components directory and the test/mock directory
 * and returns a map of:
 *
 *    {
 *      [file name transformed to a JSX element name]: the mdx file's default component
 *    }
 *
 */
async function importMdxFilesAndTransformThemIntoJsxComponentsScript(
  resolve,
  reject
): Promise<ReturnType> {
  try {
    // 1. Import various MDX files from various places. Apparently, import.meta.glob only supports string literals,
    //    so I am leaving this hard-coded for now.
    const rawImportsFromTestMock: Record<
      string,
      Promise<Component<React.ReactNode>>
    > = import.meta.glob("../../test/mock/*.mdx");

    const rawImportsFromMdxComponents: Record<
      string,
      Promise<Component<React.ReactNode>>
    > = import.meta.glob("../mdx-components/*.mdx");

    // 2. Await the promises and then associate their resolved default exports to their transformed file names.
    const jsxNameToJsxComponentPairsPromises: Promise<
      [string, Component<React.ReactNode>]
    >[] = Object.entries({
      ...rawImportsFromTestMock,
      ...rawImportsFromMdxComponents,
    }).map(waitForImportToResolveAndExtractDefaultExport);

    const jsxNameToJsxComponentPairs: [string, Component<React.ReactNode>][] =
      await Promise.all(jsxNameToJsxComponentPairsPromises);

    const popoutWrapped = jsxNameToJsxComponentPairs.map(wrapWithPopout);

    const jsxComponentMap = Object.fromEntries(popoutWrapped);

    // 3. Make a combined component map. Components are available as:
    //      <MyComponent />
    //      <MyComponentPopout />
    //      <MyComponentLink /> // @TODO - Haven't done this yet!
    const combinedComponentMap = {
      ...jsxComponentMap,
      ...Object.fromEntries(jsxNameToJsxComponentPairs),
    };

    const componentsWithMetaData =
      addMetaDataToComponentMap(combinedComponentMap);

    resolve(componentsWithMetaData);
  } catch (error) {
    reject(error);
  }
}

export default async function importMdxFilesIntoJsxComponentMap(): Promise<ReturnType> {
  return new Promise(
    importMdxFilesAndTransformThemIntoJsxComponentsScript
  ) as Promise<ReturnType>;
}
