import { Cohere } from "langchain/llms";
import { AnalyzeDocumentChain, loadSummarizationChain } from "langchain/chains";

/**
 * Used to summarize multiple docs.
 */
export const run = async () => {
  const model = new Cohere({ temperature: 0 });
  const text =
    "A single piece of text as input. Use AnalyzeDocumentChain when you want to summarize a single peices of text as input. Otherwise, you would need to split the text into chunks and use a separate function to summarize";
  //load summarization chain with Cohere
  const combineDocsChain = loadSummarizationChain(model);
  // the analyzedocschain is used to summarize a single piece of text instead of chunks of text
  const chain = new AnalyzeDocumentChain({
    combineDocumentsChain: combineDocsChain,
  });
  const res = await chain.call({
    input_document: text,
  });
  console.log({ res });
  /**
   * {
  res: {
    text: ' AnalyzeDocumentChain can be used to summarize a single piece of text as input, while separate functions are needed to summarize text that has 
been split into chunks.'
  }
}
   */
};
