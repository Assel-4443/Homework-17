import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export default openai;


export const translateText = async (text, targetLanguage = "en") => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Ты переводчик. Переводи текст на нужный язык." },
        { role: "user", content: `Переведи на ${targetLanguage}: ${text}` },
      ],
      temperature: 0.7,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Ошибка при запросе к OpenAI:", error);
    return "Ошибка перевода";
  }
};
