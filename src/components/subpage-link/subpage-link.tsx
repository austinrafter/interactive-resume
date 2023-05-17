import React from "react";
import SubpageLinkContentHeader from "./subpage-link-content-header";
import SubpageLinkContentBody from "./subpage-link-content-body";
import styles from "./subpage-link.module.less";
import { useNavigate } from "react-router-dom";

interface ComponentProps {
  component: React.ReactNode;
}

interface ChildrenProps {
  children: React.ReactNode;
}

type Props = ComponentProps | ChildrenProps;

// Typeguards
const isComponentProps = (props: Props): props is Props & ComponentProps =>
  "component" in props;
const isChildrenProps = (props: Props): props is Props & ChildrenProps =>
  "children" in props;

export default function SubpageLink(props: Props) {
  const navigate = useNavigate();

  const escapeKeyChangeLink = (event) => {
    if (event.key == "Escape") {
      navigate("/");
    } else {
      // debugger;
    }
  };

  return (
    <div
      className={styles.root}
      style={{
        background: "none",
        border: "none",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "900px",
        position: "absolute",
        top: "100px",
      }}
      onKeyUp={escapeKeyChangeLink}
    >
      <SubpageLinkContentHeader
        handleClose={() => {
          navigate("/");
        }}
        handleBack={() => {
          navigate(-1);
        }}
        handleForward={() => {
          navigate(1);
        }}
      />
      <SubpageLinkContentBody>
        {isComponentProps(props)
          ? props.component
          : isChildrenProps(props)
          ? props.children
          : null}
        <div onKeyUp={escapeKeyChangeLink}></div>
      </SubpageLinkContentBody>
    </div>
  );
}
