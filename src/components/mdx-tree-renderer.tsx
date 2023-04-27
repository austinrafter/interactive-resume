import React from "react";
import Resume from "../../test/mock/mock-resume.mdx";

export default function MdxTreeRenderer(props: { filename: string }) {
  return (
    <div>
      <span>you passed {props.filename}</span>
      <Resume />
    </div>
  );
}
