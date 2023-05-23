import { Component } from "mdx/types";
import React from "react";
import { getJsxNameFromRelativePath } from "./name/get-jsx-name.ts";
import { Link } from "react-router-dom";
import { getUrlSlugNameFromRelativePath } from "./name";

async function waitForImportToResolveAndExtractDefaultExport([
  fileName,
  importPromise,
]: [string, () => Promise<{ default: Component<React.ReactNode> }>]): Promise<
  [string, Component<React.ReactNode>]
> {
  const theJsxComponent: React.ReactNode = (await importPromise())
    .default as React.ReactNode;
  const jsxName: string = getJsxNameFromRelativePath(fileName);

  return [jsxName, theJsxComponent as Component<React.ReactNode>];
}

function wrapWithLink([fileName]: [string, Component<React.ReactNode>]): [
  string,
  Component<React.ReactNode>
] {
  const PageLink: Component<React.ReactNode> = () => (
    <Link
      to={`/${getUrlSlugNameFromRelativePath(fileName)}`}
      state={{ from: location.pathname }}
    >
      {fileName}
    </Link>
  );

  return [`${fileName}Link`, PageLink];
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

export type WrappedJsxComponentsDictionary = Record<
  string,
  Component<React.ReactNode>
>;

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
  resolve: (something: any) => void,
  reject: (error: any) => void
): Promise<WrappedJsxComponentsDictionary> {
  try {
    // 1. Import various MDX files from various places. Apparently, import.meta.glob only supports string literals,
    //    so I am leaving this hard-coded for now.
    const rawImportsFromTestMock: Record<
      string,
      () => Promise<{ default: Component<React.ReactNode> }>
    > = import.meta.glob("../../test/mock/*.mdx");

    const rawImportsFromMdxComponents: Record<
      string,
      () => Promise<{ default: Component<React.ReactNode> }>
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

    const linkWrapped = jsxNameToJsxComponentPairs.map(wrapWithLink);

    const jsxComponentMap = Object.fromEntries(linkWrapped);

    // 3. Make a combined component map. Components are available as:
    //      <MyComponent />
    //      <MyComponentLink />
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

export default async function importMdxFilesIntoJsxComponentMap(): Promise<WrappedJsxComponentsDictionary> {
  return new Promise(
    importMdxFilesAndTransformThemIntoJsxComponentsScript
  ) as Promise<WrappedJsxComponentsDictionary>;
}
