
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles } from "lucide-react";

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

  const suggestions = [
    "Market trends overview", 
    "Series A valuations", 
    "Fintech funding analysis", 
    "Risk assessment metrics"
  ];

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <div className="px-8 py-6 bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">AI Analysis Chat</h2>
            <p className="text-sm text-slate-600">Ask me anything about funding trends, valuations, or market analysis</p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-8">
        <div className="space-y-6 max-w-4xl mx-auto">
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

      <div className="p-8 bg-white/80 backdrop-blur-sm border-t border-slate-200/50">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex space-x-4">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about funding trends, valuations, or market analysis..."
              className="flex-1 border-2 border-slate-200 focus:border-blue-400 rounded-xl px-4 py-3 text-sm bg-white/90 backdrop-blur-sm shadow-sm"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              disabled={!inputText.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => setInputText(suggestion)}
                className="text-xs border-slate-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 rounded-lg px-3 py-2 transition-all duration-200"
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
