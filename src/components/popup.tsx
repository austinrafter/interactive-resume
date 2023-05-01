import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface Props {
  trigger: string;
  component: React.ReactNode;
}

export default function Popout(props: Props) {
  return (
    <Popup trigger={<button> {props.trigger}</button>} position="right center">
      {props.component}
    </Popup>
  );
}
