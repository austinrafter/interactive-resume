import { Cohere } from "langchain/llms";

export const run = async () => {
  // temperature controls how random/creative the response is. It ranges from 0(deterministic) to 1(max creativity)
  const model = new Cohere({ temperature: 0.1 });

  const res = await model.call("What is the capital city of France?");
  console.log({ res });
  //output: "Paris"
};
