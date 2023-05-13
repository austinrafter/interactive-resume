import { CohereEmbeddings } from "langchain/embeddings";
import { Cohere } from "langchain/llms";
import { loadQAChain } from "langchain/chains";
import { Document } from "langchain/document";
import { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";

type PineConeMetadata = Record<string, any>;

const embeddings = new CohereEmbeddings();

export async function callVectorDBQAChain(
  query: string,
  index: VectorOperationsApi,
  namespace: string
) {
  const question = query;
  const returnedResults = 3;
  const questionEmbedding = await embedQuery(question, embeddings);
  const docs = await similarityVectorSearch(
    questionEmbedding,
    returnedResults,
    index,
    namespace
  );
  const inputs = { question, input_documents: docs };
  const llm = new Cohere();
  const qaChain = loadQAChain(llm, {
    type: "stuff",
  });
  console.log("qachain", qaChain);
  const result = await qaChain.call(inputs);
  console.log("result", result);

  return result;
}

//vectorstore
export async function embedQuery(
  query: string,
  embeddings: CohereEmbeddings
): Promise<number[]> {
  const embeddedQuery = await embeddings.embedQuery(query);
  console.log("embeddedQuery", embeddedQuery);
  return embeddedQuery;
}
//change the namespace to match your vectorbase
export async function similarityVectorSearch(
  vectorQuery: number[],
  k = 3,
  index: VectorOperationsApi,
  namespace: string
): Promise<Document[]> {
  const results = await index.query({
    queryRequest: {
      topK: k,
      includeMetadata: true,
      vector: vectorQuery,
      namespace,
    },
  });

  const result: [Document, number][] = [];

  if (results.matches) {
    for (const res of results.matches) {
      console.log("res", res);
      const { text: pageContent, ...metadata } =
        res?.metadata as PineConeMetadata;
      if (res.score) {
        result.push([new Document({ metadata, pageContent }), res.score]);
      }
    }
  }

  return result.map((result) => result[0]);
}
