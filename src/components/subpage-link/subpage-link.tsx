import React from "react";
import "reactjs-popup/dist/index.css";
import SubpageLinkContentHeader from "./subpage-link-content-header";
import SubpageLinkContentBody from "./subpage-link-content-body";
import styles from "./subpage-link.module.less";

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
  const [open, setOpen] = React.useState(false);

  return (
    <div
      classname={styles.root}
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
    >
      <SubpageLinkContentHeader handleClose={() => setOpen(false)} />
      <SubpageLinkContentBody>
        {isComponentProps(props)
          ? props.component
          : isChildrenProps(props)
          ? props.children
          : null}
      </SubpageLinkContentBody>
    </div>
  );
  /*<Popup
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      className={styles.root}
      contentStyle={{
        background: "none",
        border: "none",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "900px",
      }}
      modal
      trigger={<a>{props.trigger}</a>}
    >
      <SubpageLinkContentHeader handleClose={() => setOpen(false)} />
      <SubpageLinkContentBody>
        {isComponentProps(props)
          ? props.component
          : isChildrenProps(props)
          ? props.children
          : null}
      </SubpageLinkContentBody>
    </Popup>
  );

     */
}
