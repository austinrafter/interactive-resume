import React, { useEffect, useState } from "react";
import Resume from "../../test/mock/mock-resume.mdx";
import Loading from "../../test/mock/loading.mdx";
import Error from "../../test/mock/import-error.mdx";
import { MDXProvider } from "@mdx-js/react";
import { Component } from "mdx/types";
import isEmpty from "lodash/isEmpty";
import importMdxFilesIntoJsxComponentMap, {
  ComponentWithMetadata,
} from "../util/import-mdx-files-into-jsx-component-map";
import { PiiContext } from "./pii";
import pii from "../../src/util/get-encrypted-pii.ts";
import { Outlet, useLocation } from "react-router-dom";
import { scrollToHeader } from "../util/dom-manipulation/scroll-to-header";

export default function MdxTreeRenderer() {
  const [mdxFiles, setMdxFiles] =
    useState<
      Record<string, ComponentWithMetadata<Component<React.ReactNode>>>
    >();
  const [error, setError] = useState<null>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    importMdxFilesIntoJsxComponentMap().then(setMdxFiles).catch(setError);
  }, []);

  // Here's some code which allows the website to support scrolling to the scroll query param
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const scrollTarget = search.get("scroll");

  useEffect(() => {
    if (scrollTarget) {
      scrollToHeader(scrollTarget);
    }
  }, [scrollTarget, isEmpty(mdxFiles)]);

  if (isEmpty(mdxFiles)) {
    return <Loading />;
  }

  return (
    <MDXProvider components={mdxFiles}>
      <PiiContext.Provider value={pii}>
        {error ? <Error /> : isEmpty(mdxFiles) ? <Loading /> : <Resume />}
        <Outlet />
      </PiiContext.Provider>
    </MDXProvider>
  );
}
