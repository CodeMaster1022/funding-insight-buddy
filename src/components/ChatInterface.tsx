
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm your funding analysis AI assistant. I can help you analyze investment trends, evaluate funding rounds, and provide insights into market dynamics. What would you like to explore today?",
    sender: "ai",
    timestamp: new Date(),
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on current market data, venture capital funding has increased by 23% this quarter. The fintech sector is showing particularly strong growth with an average deal size of $12.5M.",
        "I'm analyzing the funding patterns you mentioned. Early-stage startups in the AI/ML space are attracting significant attention, with seed rounds averaging $2.8M compared to $1.9M last year.",
        "The data shows interesting trends in geographic distribution of funding. Silicon Valley maintains its lead, but we're seeing increased activity in Austin (+45%) and Miami (+67%) markets.",
        "Looking at the valuation metrics, the median post-money valuation for Series A rounds has stabilized at $15M after the correction in late 2022. Would you like me to dive deeper into any specific sector?",
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="px-6 py-4 bg-white border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">AI Analysis Chat</h2>
        <p className="text-sm text-slate-600">Ask me anything about funding trends, valuations, or market analysis</p>
      </div>
      
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && (
            <MessageBubble
              message={{
                id: "typing",
                text: "Analyzing data...",
                sender: "ai",
                timestamp: new Date(),
              }}
              isTyping={true}
            />
          )}
        </div>
      </ScrollArea>

      <div className="p-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto flex space-x-4">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about funding trends, valuations, or market analysis..."
            className="flex-1 border-slate-300 focus:border-blue-500"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            disabled={!inputText.trim() || isTyping}
          >
            Send
          </Button>
        </div>
        <div className="max-w-4xl mx-auto mt-3">
          <div className="flex flex-wrap gap-2">
            {["Market trends overview", "Series A valuations", "Fintech funding analysis", "Risk assessment"].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => setInputText(suggestion)}
                className="text-xs border-slate-300 hover:bg-blue-50 hover:border-blue-300"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
