import React, { useCallback } from "react";
import styles from "./chat.module.less";
import { IChatMessage } from "./interface/chat-message";
import ChatMessage from "./chat-message";
import { MessageSender } from "./interface/message-sender";
import { removeTrailingNewline } from "../../util/string-helpers";

// @TODO: import the backend/ai stuff here

// @TODO: Figure out these props
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatProps {}
export function Chat(props: ChatProps) {
  const [messageHistory, setMessageHistory] = React.useState<IChatMessage[]>(
    []
  );
  const [query, setQuery] = React.useState("");

  const handleSubmit = useCallback(() => {
    setMessageHistory((prev) => [
      ...prev,
      { sender: MessageSender.Human, text: query },
    ]);
    setQuery("");
  }, [messageHistory, query]);

  const handleEnterSubmit = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setQuery(removeTrailingNewline(query));
        handleSubmit();
      }
    },
    [handleSubmit, query]
  );

  return (
    <div className={styles.root}>
      <textarea
        onKeyUp={handleEnterSubmit}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {messageHistory.map((m, index) => (
        <ChatMessage key={index}>{m.text}</ChatMessage>
      ))}
    </div>
  );
}
