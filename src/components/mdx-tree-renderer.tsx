import React, { useEffect, useState } from "react";
import Resume from "../../test/mock/mock-resume.mdx";
import PopupLinkifier from "./popup-linkifier";
import Loading from "../../test/mock/loading.mdx";
import Error from "../../test/mock/import-error.mdx";
import { MDXProvider } from "@mdx-js/react";
import { Component } from "mdx/types";
import { getJsxNameFromRelativePath } from "../util/get-jsx-name";
import isEmpty from "lodash/isEmpty";

export default function MdxTreeRenderer() {
  const [mdxFiles, setMdxFiles] =
    useState<Record<string, Component<React.ReactNode>>>();
  const [error, setError] = useState<null>();

  useEffect(() => {
    try {
      const rawImport: Record<
        string,
        Component<React.ReactNode>
      > = import.meta.glob("../../test/mock/*.mdx");

      const jsxNameDict = Object.entries(rawImport).reduce(
        (importDict, [fileName, mdxComponent]) => ({
          ...importDict,
          [getJsxNameFromRelativePath(fileName)]: mdxComponent,
        }),
        {}
      );

      setMdxFiles(jsxNameDict);
    } catch (error) {
      setError(error);
    }
  }, []);

  if (isEmpty(mdxFiles)) {
    return <Loading />;
  }

  return (
    <MDXProvider components={mdxFiles}>
      <PopupLinkifier>
        {error ? <Error /> : isEmpty(mdxFiles) ? <Loading /> : <Resume />}
      </PopupLinkifier>
    </MDXProvider>
  );
}
