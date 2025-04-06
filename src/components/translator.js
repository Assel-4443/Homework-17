import React, { useState } from "react";
import { translateText } from "../api/openai";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    const result = await translateText(inputText, "fr"); 
    setTranslatedText(result);
  };

  return (
    <div>
      <h2>Переводчик</h2>
      <textarea 
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)} 
        placeholder="Введите текст..."
      />
      <button onClick={handleTranslate}>Перевести</button>
      {translatedText && <p>Перевод: {translatedText}</p>}
    </div>
  );
};

export default Translator;
