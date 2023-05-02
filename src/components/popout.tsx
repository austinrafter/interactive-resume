import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  return (
    <Popup trigger={<button> {props.trigger}</button>} position="right center">
      {isComponentProps(props)
        ? props.component
        : isChildrenProps(props)
        ? props.children
        : null}
    </Popup>
  );
}
