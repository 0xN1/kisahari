import ollama from "ollama";

export const chatStream = async (
  data: JournalEntry[],
  query: string,
  model?: string
) => {
  const q = query || "who are you?";
  const selectedModel = model || "nous-hermes2:latest";

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
      .replace(/[.\/#!$%\^&\*;\[\]_\\]+/g, "") // Remove special characters
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .toLowerCase();

    return cleanInput;
  }

  const cleanerData = compressString(flattenedData.join("|"));

  const response = await ollama.chat({
    model: selectedModel,
    messages: [
      {
        content: `your name is kisahari. you are an AI within a journaling app. 
        Your purpose is to assist the user in reflecting on their thoughts through a thoughtful and empathetic approach. 
        The user will not respond to your prompts. You need to be particularly mindful of time and date.
        Your goal is to provide fresh perspectives, encouragement, or even constructive debate, while maintaining concise yet meaningful responses.
        current time is ${new Date().toLocaleString()} gmt+8. answer the user based on the following journal entries: ${cleanerData}`,
        role: "system",
      },
      // { content: "my journal entries\n" + cleanerData, role: "user" },
      {
        content: q,
        role: "user",
      },
    ],
    keep_alive: 60,
    stream: true,
  });

  return response;
};

export const getAllModels = async () => {
  try {
    const models = await ollama.list();
    return models;
  } catch (e) {
    console.error(e);
  }
};
