import { TextLoader } from "langchain/document_loaders/fs/text";
import { ImportMetaGlobResult } from "../../src/util/import-mdx-files-into-jsx-component-map";
import { Document } from "langchain/document";

export class AiChatService {
  async loadDocuments() {
    const modules: ImportMetaGlobResult = import.meta.glob(
      "../../test/mock/*.mdx"
    );
    const documents: Record<string, Document[]> = {};

    for (const filepath in modules) {
      const loader = new TextLoader(filepath);
      // @TODO - this doesn't work with vite. We're gonna have to wire up a client / server system so that
      //         it can run.
      //         This also means the server could be in another language; we should probably just use
      //         Python for the server, even though I hate Python. There would be a client file in Typescript.
      const docs = await loader.load();
      documents[filepath] = docs;
    }

    return documents;
  }
}
