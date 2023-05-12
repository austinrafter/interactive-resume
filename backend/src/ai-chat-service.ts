import { TextLoader } from "langchain/document_loaders";
import { ImportMetaGlobResult } from "../../src/util/import-mdx-files-into-jsx-component-map";

export class AiChatService {
  async loadDocuments() {
    const modules: ImportMetaGlobResult = import.meta.glob(
      "../../test/mock/*.mdx"
    );
    for (const filepath in modules) {
      debugger;
      const loader = new TextLoader(filepath);
    }
  }
}
