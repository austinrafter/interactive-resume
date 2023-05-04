import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PopoutContentHeader from "./popout-content-header";
import PopoutContentBody from "./popout-content-body";
import styles from "./popout.module.less";

interface ComponentProps {
  component: React.ReactNode;
}

interface ChildrenProps {
  children: React.ReactNode;
}

type Props = (ComponentProps | ChildrenProps) & {
  trigger: string | React.ReactNode;
};

// Typeguards
const isComponentProps = (props: Props): props is Props & ComponentProps =>
  "component" in props;
const isChildrenProps = (props: Props): props is Props & ChildrenProps =>
  "children" in props;

export default function Popout(props: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popup
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
      <PopoutContentHeader handleClose={() => setOpen(false)} />
      <PopoutContentBody>
        {isComponentProps(props)
          ? props.component
          : isChildrenProps(props)
          ? props.children
          : null}
      </PopoutContentBody>
    </Popup>
  );
}
