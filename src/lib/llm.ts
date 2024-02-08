import {
  ChatResponseChunk,
  ChromaVectorStore,
  ContextChatEngine,
  Document,
  HuggingFaceEmbedding,
  Ollama,
  SimpleChatEngine,
  VectorStoreIndex,
  serviceContextFromDefaults,
  storageContextFromDefaults,
} from "llamaindex";

export const llmIndex = async (data?: {}) => {
  const testData = data || {
    title: "Test Title",
    description: "Test Description",
    url: "https://www.test.com",
    image: "https://www.test.com/image.jpg",
    type: "article",
  };

  const doc = new Document(testData);

  console.log("Document", JSON.stringify(doc));

  const chromaVS = new ChromaVectorStore({
    collectionName: "test-collection",
  });

  console.log("Chroma Vector Store", JSON.stringify(chromaVS));

  const ctx = await storageContextFromDefaults({
    vectorStore: chromaVS,
  });

  const serviceCtx = await serviceContextFromDefaults({
    llm: new Ollama({
      model: "nous-hermes2",
    }),
    embedModel: new HuggingFaceEmbedding(),
  });

  const index = await VectorStoreIndex.fromDocuments([doc], {
    vectorStore: chromaVS,
    storageContext: ctx,
    serviceContext: serviceCtx,
  });

  //   const retriever = index.asRetriever();
  //   retriever.similarityTopK = 5;

  //   const chatEngineCtx = new ContextChatEngine({
  //     chatModel: new Ollama({
  //       model: "nous-hermes2",
  //     }),
  //     retriever,
  //   });

  //   const response = await chatEngineCtx.chat({
  //     message: "what is the url of the document?",
  //     chatHistory: [],
  //     stream: false,
  //   });

  //   console.log("Index", JSON.stringify(index));

  const queryEngine = index.asQueryEngine();

  const response = await queryEngine.query({
    query: "give me an eli5 of the content",
    stream: false,
  });

  console.log("Response", JSON.stringify(response));

  //   const queryEngine = index.asQueryEngine();
  //   const response = await queryEngine.query({
  //     query: "what is the url of the document?",
  //     stream: false,
  //   });

  //   console.log("Index", JSON.stringify(index.storageContext));

  //   const response = await llm.complete({
  //     prompt: "what is the url of the document?",
  //   });

  //   const response = index.asQueryEngine().query({
  //     query: "what is the url of the document?",
  //     stream: false,
  //   });

  // const llm = new Ollama({
  //   model: "nous-hermes2",
  // });

  // const query = "who are the rebels?";
  // const response = await llm.chat({
  //   messages: [
  //     { content: JSON.stringify(data), role: "user" },
  //     {
  //       content: "reply in english, make it conscise and clear. 200 words max",
  //       role: "assistant",
  //     },
  //     {
  //       content: query,
  //       role: "user",
  //     },
  //   ],
  // });

  // console.log("Response", JSON.stringify(response.raw?.total_duration));
};

export const chat = async (data: Entry[], query: string) => {
  const llm = new Ollama({
    model: "nous-hermes2",
  });

  const q = query || "who are you?";

  const cleanData = data.map((e) => {
    return {
      content: e.content,
      created: e.created,
      title: e.title,
      tldr: e.tldr,
    };
  });

  const flattenedData = cleanData.map((e) => {
    return `{content:${e.content},title:${e.title},tldr:${e.tldr},created:${e.created}}`;
  });

  function compressString(inputStr: string) {
    const cleanInput = inputStr
      .replace(/(&nbsp;)+/g, " ") // Remove HTML entities
      .replace(/[.,\/#!$%\^&\*;\[\]_\\]+/g, "") // Remove special characters
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .toLowerCase();

    return cleanInput;
  }

  const cleanerData = compressString(flattenedData.join("|"));

  console.log("Cleaner Data", cleanerData);
  // console.log("Clean Data", JSON.stringify(cleanerData));

  const response = await llm.chat({
    messages: [
      {
        content: `your name is kisahari. you are an AI within a journaling app. 
          Your purpose is to assist the user in reflecting on their thoughts through a thoughtful and empathetic approach. 
          The user will not directly communicate with you or respond to your prompts.
          My goal is to provide fresh perspectives, encouragement, or even constructive debate, while maintaining concise yet meaningful responses.
          user's timezone is gmt+8`,
        role: "system",
      },
      { content: cleanerData, role: "user" },
      {
        content: q,
        role: "user",
      },
    ],
  });

  if (response) {
    return {
      message: response.message,
      done: response.raw?.done,
      duration: response.raw?.total_duration,
    };
  }
};

export const chatStream = async (data: Entry[], query: string) => {
  const llm = new Ollama({
    model: "nous-hermes2",
  });

  const q = query || "who are the rebels?";

  const streamResponse = await llm.chat({
    messages: [
      { content: JSON.stringify(data), role: "user" },
      {
        content: `your name is kisahari. you are an AI within a journaling app. 
          Your purpose is to assist the user in reflecting on their thoughts through a thoughtful and empathetic approach. 
          The user will not directly communicate with me or respond to my prompts.
          My goal is to provide fresh perspectives, encouragement, or even constructive debate, while maintaining concise yet meaningful responses.
          200 words max.
          user's timezone is gmt+8`,
        role: "assistant",
      },
      {
        content: q,
        role: "user",
      },
    ],
    stream: true,
  });

  // const stream = streamToResponse(streamResponse);

  // return streamResponse;

  for await (const response of streamResponse) {
    console.log(response);
    return response;
  }
};
