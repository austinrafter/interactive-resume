import React from "react";
import Resume from "../../test/mock/mock-resume.mdx";
import PopupLinkifier from "./popup-linkifier";
import Postman from "../../test/mock/postman.mdx";

export default function MdxTreeRenderer(props: { filename: string }) {
    const keywordMap = {postman: Postman}
  return (

        <PopupLinkifier keywordMap={keywordMap}>
            <Resume />
        </PopupLinkifier>

  );
}
