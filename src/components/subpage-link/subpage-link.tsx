import React, { CSSProperties, KeyboardEventHandler } from "react";
import SubpageLinkContentHeader from "./subpage-link-content-header";
import SubpageLinkContentBody from "./subpage-link-content-body";
import styles from "./subpage-link.module.less";
import { useNavigate, useLocation } from "react-router-dom";

interface ComponentProps {
  component: React.ReactNode;
}

interface ChildrenProps {
  children: React.ReactNode;
}

type Props = ComponentProps | ChildrenProps;

// @TODO - move this to stylesheet
const WRAPPER_STYLE: CSSProperties = {
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
};

// Typeguards
const isComponentProps = (props: Props): props is Props & ComponentProps =>
  "component" in props;
const isChildrenProps = (props: Props): props is Props & ChildrenProps =>
  "children" in props;

export default function SubpageLink(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const escapeKeyChangeLink = (event: KeyboardEvent): void => {
    if (event.key == "Escape") {
      navigate("/", { state: { from: location } });
    }
  };

  return (
    <div
      className={styles.root}
      style={WRAPPER_STYLE}
      onKeyUp={
        escapeKeyChangeLink as unknown as KeyboardEventHandler<HTMLDivElement>
      }
    >
      <SubpageLinkContentHeader
        handleClose={() => {
          navigate("/", { state: { from: location.pathname } });
        }}
        handleBack={() => {
          navigate(-1);
        }}
        handleForward={() => {
          navigate(1);
        }}
        prevPageLocation={history.state.usr?.from}
      />
      <SubpageLinkContentBody>
        {isComponentProps(props)
          ? props.component
          : isChildrenProps(props)
          ? props.children
          : null}
        <div
          onKeyUp={
            escapeKeyChangeLink as unknown as KeyboardEventHandler<HTMLDivElement>
          }
        ></div>
      </SubpageLinkContentBody>
    </div>
  );
}
