import React, { useState } from 'react';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Adicionar a mensagem do usuário
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    // Gerar resposta simples do bot
    const botResponse = { sender: "bot", text: `Você disse: "${input}". Como posso ajudar?` };
    setMessages(prev => [...prev, userMessage, botResponse]);

    // Limpar o campo de entrada
    setInput("");
  };

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", width: "300px" }}>
      <div style={{ height: "300px", overflowY: "auto", marginBottom: "16px", padding: "8px" }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.sender === "user" ? "right" : "left",
              marginBottom: "8px",
            }}
          >
            <strong>{message.sender === "user" ? "Você" : "Bot"}:</strong> {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "calc(100% - 50px)", padding: "8px" }}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={handleSendMessage} style={{ padding: "8px", marginLeft: "8px" }}>
        Enviar
      </button>
    </div>
  );
};

export default ChatBot;
