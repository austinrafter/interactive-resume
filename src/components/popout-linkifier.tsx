import React from "react";

interface Props<MdxType> {
  children: MdxType;
}
export default function PopoutLinkifier(props: Props<React.ReactElement>) {
  return <span>{props.children}</span>;
}
