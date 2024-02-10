import ollama from "ollama";

export const chat = async (data: Entry[], query: string) => {
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

  const response = await ollama.chat({
    model: "nous-hermes2",
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
    keep_alive: 60,
  });

  if (response) {
    return {
      message: response.message,
      done: response.done,
      duration: response.total_duration,
    };
  }
};

export const chatStream = async (
  data: Entry[],
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
      .replace(/[.,\/#!$%\^&\*;\[\]_\\]+/g, "") // Remove special characters
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .toLowerCase();

    return cleanInput;
  }

  const cleanerData = compressString(flattenedData.join("|"));

  // console.log("my journal entries\n" + cleanerData);

  const response = await ollama.chat({
    // model: "nous-hermes2-mixtral", // 8-20s
    // model: "nous-hermes2", // 5-6s // the best so far
    // model: "llava", // okay, kinda fast too // multimodal
    // model: "qwen",
    // model: "qwen:7b", // 3s // less accurate but faster
    // model: "qwen:14b", // 5-6s // more accurate but slower
    model: selectedModel,
    messages: [
      {
        content: `your name is kisahari. you are an AI within a journaling app. 
        Your purpose is to assist the user in reflecting on their thoughts through a thoughtful and empathetic approach. 
        The user will not directly communicate with you or respond to your prompts.
        My goal is to provide fresh perspectives, encouragement, or even constructive debate, while maintaining concise yet meaningful responses.
        current time is ${new Date().toLocaleString()} gmt+8`,
        role: "system",
      },
      { content: "my journal entries\n" + cleanerData, role: "user" },
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
  const models = await ollama.list();
  return models;
};
