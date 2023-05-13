import { Footer } from "../footer/footer";
import { LoadDocuments } from "./load-documents";
import { ErrorBoundary } from "react-error-boundary";

export function AiManagementConsole() {
  return (
    <div>
      <h1>AI Management Console</h1>
      <ErrorBoundary
        fallback={
          <p>
            Something went wrong in LoadDocuments. Check the web browser's
            development console
          </p>
        }
      >
        <LoadDocuments />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}
