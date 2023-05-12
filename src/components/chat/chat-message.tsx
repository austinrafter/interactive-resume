import React from "react";
import styles from "./chat-message.module.less";
import classNames from "classnames";
import { MessageSender } from "./interface/message-sender";

interface ChatMessageProps {
  children: React.ReactNode;
  sender: MessageSender;
}
export default function ChatMessage(props: ChatMessageProps) {
  const messageClass = props.sender === MessageSender.Human ? "human" : "ai";
  return (
    <div className={classNames(styles[messageClass], styles.root)}>
      {props.children}
    </div>
  );
}
