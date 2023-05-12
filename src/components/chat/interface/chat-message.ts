import { MessageSender } from "./message-sender";

export interface IChatMessage {
  sender: MessageSender;
  text: string;
}
