// Source: https://github.com/mayooear/langchain-js-tutorial/blob/main/src/document_loaders/text.ts
// Credit goes to https://github.com/mayooear
import { TextLoader } from "langchain/document_loaders/fs/text";

// @TODO - Figure out if we need a different loader for the .mdx files.
// @TODO - Use the import glob that's used elsewhere to import all the mdx files.
//         Note - since this backend won't be run by the Vite frontend static bundler,
//         we can use other loaders that aren't supported by Vite. Also note - the server
//         won't necessarily need to load files; rather, it'd be a ci-cd system that would.
//         Or the developer (me) just does it manually for MVP purposes. TL;DR: For document loading,
//         we don't need to worry too much if Vite can't handle it.

//loads data from text files
export const run = async () => {
  const loader = new TextLoader("test/mock/mock-resume.mdx");
  const docs = await loader.load();
  console.log({ docs });
  /**
     * {
  docs: [
    Document {
      pageContent: 'this is an example text to see how langchain loads raw text.',
      metadata:
    }
  ]
}
     */
};
