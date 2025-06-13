
interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

export function MessageBubble({ message, isTyping = false }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div className={`max-w-[80%] ${isUser ? "order-2" : ""}`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">AI</span>
            </div>
            <span className="text-xs text-slate-500">Funding Analysis AI</span>
          </div>
        )}
        
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? "bg-blue-600 text-white ml-4"
              : "bg-white text-slate-800 border border-slate-200 mr-4"
          }`}
        >
          <p className="text-sm leading-relaxed">
            {isTyping ? (
              <span className="flex items-center space-x-1">
                <span>{message.text}</span>
                <div className="flex space-x-1 ml-2">
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </span>
            ) : (
              message.text
            )}
          </p>
        </div>
        
        <div className={`text-xs text-slate-500 mt-1 ${isUser ? "text-right mr-4" : "ml-8"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
