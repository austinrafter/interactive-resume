import { useCallback, useState } from "react";
import { AiChatService } from "../../../backend/src/ai-chat-service";

// @TODO  - remove console logs
export function LoadDocuments() {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const loadDocuments = useCallback(() => {
    setIsLoading(true);
    const aiChatService = new AiChatService();
    console.log("Loading the documents!");
    aiChatService
      .loadDocuments()
      .then(() => {
        console.log("Loaded the documents!");
      })
      .catch((e) => {
        setError(e);
        console.log("Error loading the documents!");
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Load Documents</h2>
      <button onClick={loadDocuments} disabled={loading}>
        Load
      </button>
    </div>
  );
}
