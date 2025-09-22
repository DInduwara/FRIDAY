import { useState } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatPanel({ setAgentSteps }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const userInput = input;
    setInput("");

    try {
      const res = await fetch("http://localhost:11000/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let aiReply = "";
      let steps = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n").filter(Boolean);

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const jsonStr = line.replace("data: ", "");
            try {
              const parsed = JSON.parse(jsonStr);
              console.log("SSE chunk:", parsed);

              // Supervisor reply
              if (parsed?.response?.supervisor?.content) {
                aiReply = parsed.response.supervisor.content;
              }

              // Dynamic agent flow capture
              const agentLike = Object.entries(parsed.response || {})
                .filter(([key]) => key !== "supervisor")
                .map(([role, obj]) => ({
                  type: role,
                  content: obj?.content || JSON.stringify(obj),
                }));

              if (agentLike.length) {
                steps = agentLike;
                setAgentSteps(steps);
              }
            } catch (err) {
              console.error("Bad SSE chunk", err);
            }
          }
        }
      }

      if (aiReply) {
        setMessages((prev) => [...prev, { role: "ai", content: aiReply }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  return (
    <div className="flex flex-col h-full border-r border-gray-800 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white p-4 font-bold text-lg text-center shadow-md">
        F.R.I.D.A.Y
      </div>

      {/* Scrollable messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
      </div>

      {/* Input at bottom */}
      <div className="flex p-3 bg-gray-900/70 backdrop-blur-lg border-t border-gray-700">
        <input
          className="flex-1 p-2 rounded-lg bg-gray-800/80 text-white placeholder-gray-400 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          className="ml-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:scale-105 transition-transform"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}