import React from "react";

interface Props {
  keywordMap: Record<string, React.ReactNode>;
  children: React.ReactNode;
}
export default function PopupLinkifier(props: Props) {
  return <span>{props.children}</span>;
}
