import React, { useEffect, useState } from "react";
import Resume from "../../test/mock/mock-resume.mdx";
import PopoutLinkifier from "./popout-linkifier";
import Loading from "../../test/mock/loading.mdx";
import Error from "../../test/mock/import-error.mdx";
import { MDXProvider } from "@mdx-js/react";
import { Component } from "mdx/types";
import isEmpty from "lodash/isEmpty";
import importMdxFilesIntoJsxComponentMap from "../util/import-mdx-files-into-jsx-component-map";

export default function MdxTreeRenderer() {
  const [mdxFiles, setMdxFiles] =
    useState<Record<string, Component<React.ReactNode>>>();
  const [error, setError] = useState<null>();

  useEffect(() => {
    importMdxFilesIntoJsxComponentMap().then(setMdxFiles).catch(setError);
  }, []);

  if (isEmpty(mdxFiles)) {
    return <Loading />;
  }

  return (
    <MDXProvider components={mdxFiles}>
      <PopoutLinkifier>
        {error ? <Error /> : isEmpty(mdxFiles) ? <Loading /> : <Resume />}
      </PopoutLinkifier>
    </MDXProvider>
  );
}
