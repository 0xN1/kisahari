import { Document } from "langchain/document";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/community/chat_models/ollama";

const askAI = async (data: JournalEntry[], llmModel: string, query: string) => {
  let docs: Document<Record<string, any>>[] = [];

  data.forEach((entry) => {
    docs.push({
      pageContent: `{content:${entry.content}|tldr:${entry.tldr}|title:${entry.title}}`,
      metadata: {
        title: entry.title,
        created: entry.created,
        tldr: entry.tldr,
        content: entry.content,
        updated: entry.updated,
        id: entry.id,
      },
    });
  });

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  const embeddings = new OllamaEmbeddings({
    model: llmModel || "nous-hermes2:latest",
  });

  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const prompt = ChatPromptTemplate.fromTemplate(`
    your name is kisahari. you are an AI within a journaling app. 
        Your purpose is to assist the user in reflecting on their thoughts through a thoughtful and empathetic approach. 
        The user will not respond to your prompts. You need to be particularly mindful of time and date.
        Your goal is to provide fresh perspectives, encouragement, or even constructive debate, while maintaining concise yet meaningful responses.
        current time is ${new Date().toLocaleString()} gmt+8.
        Answer the following question based only on the provided context:
<context>
{context}
</context>

Question: {input}`);

  const model = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: llmModel || "nous-hermes2:latest",
  });

  const documentChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  });

  const retriever = vectorstore.asRetriever();

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const result = await retrievalChain.stream({
    input: query || "What are the journal entry for today?",
  });

  return result;
};

export { askAI };
