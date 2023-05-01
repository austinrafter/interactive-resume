import React, { useEffect, useState } from "react";
import Resume from "../../test/mock/mock-resume.mdx";
import PopupLinkifier from "./popup-linkifier";
import Postman from "../../test/mock/postman.mdx";
import Error from "../../test/mock/import-error.mdx";
import { MDXProvider } from "@mdx-js/react";
import { Component } from "mdx/types";

export default function MdxTreeRenderer() {
  const [mdxFiles, setMdxFiles] = useState();

  useEffect(() => {
    setMdxFiles(import.meta.glob("../../test/mock/*.mdx"));
  }, []);

  if (mdxFiles) {
    debugger;
  }

  const keywordMap: Record<string, Component<React.ReactNode>> = {
    Postman: Postman,
    Resume: Resume,
  };

  return (
    <MDXProvider components={keywordMap}>
      <PopupLinkifier>
        <Resume />
      </PopupLinkifier>
    </MDXProvider>
  );
}
