import React from "react";
import Postman from "../../test/mock/postman.mdx";

export default function MdxTreeRenderer(props: { filename: string }) {
  return (
    <div>
      <span>you passed {props.filename}</span>
      <Postman />
    </div>
  );
}
