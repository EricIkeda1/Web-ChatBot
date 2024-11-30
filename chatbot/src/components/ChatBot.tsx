import React, { useState } from "react";

interface Message {
  sender: string;
  text: string;
}

const abbreviationMap: { [key: string]: string } = {
  vc: "você",
  tb: "também",
  pq: "por que",
  td: "tudo",
  ok: "ok",
  vlw: "valeu",
  tbm: "também",
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const removeAccents = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const removePunctuation = (text: string): string => {
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  };

  const replaceAbbreviations = (text: string): string => {
    let result = text.toLowerCase();
    for (const abbreviation in abbreviationMap) {
      const regex = new RegExp(`\\b${abbreviation}\\b`, "gi");
      result = result.replace(regex, abbreviationMap[abbreviation]);
    }
    return result;
  };

  const processInput = (text: string): string => {
    let result = text;
    result = removeAccents(result); 
    result = removePunctuation(result);  
    result = replaceAbbreviations(result);  
    return result;
  };

  const sendMessage = () => {
    if (input.trim() === "") return;

    const processedInput = processInput(input);

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    let botReplyText = "Desculpe, não entendi o que você disse.";

    if (processedInput.includes("ola")) {
      botReplyText = "Olá! Como posso ajudar você hoje?";
    } else if (processedInput.includes("qual seu nome")) {
      botReplyText = "Eu sou um assistente virtual ChatBot, mas posso te ajudar com várias coisas!";
    } else if (processedInput.includes("tchau")) {
      botReplyText = "Até logo! Se precisar, estarei por aqui.";
    } else if (processedInput.includes("ajuda")) {
      botReplyText = "Claro! Como posso te ajudar?";
    } else if (processedInput.includes("tudo bem") || processedInput.includes("td bem")) {
      botReplyText = "Tudo ótimo! E você, como está?";
    } else if (processedInput.includes("quem é vc") || processedInput.includes("quem é você")) {
      botReplyText = "Olá, eu sou atendente virtual!";
    }

    const botReply = { sender: "bot", text: botReplyText };
    setMessages([...newMessages, botReply]);

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div id="root">
      <div className="header">ChatBot - React</div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBot;
