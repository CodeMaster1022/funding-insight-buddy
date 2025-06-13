import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Plus, Clock, Pencil, Trash2, X, Check, Menu, Search, Settings, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useTeam } from "@/contexts/TeamContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
  teamId: string;
}

const initialMessage: Message = {
  id: "1",
  text: "Hello! I'm your funding analysis AI assistant. I can help you analyze investment trends, evaluate funding rounds, and provide insights into market dynamics. What would you like to explore today?",
  sender: "ai",
  timestamp: new Date(),
};

export function ChatInterface() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "New Chat",
      messages: [initialMessage],
      lastUpdated: new Date(),
      teamId: "1",
    },
  ]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("1");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const currentSession = chatSessions.find(session => session.id === currentSessionId);
  const { selectedTeam } = useTeam();

  const handleNewChat = () => {
    if (!selectedTeam) return;
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [initialMessage],
      lastUpdated: new Date(),
      teamId: selectedTeam.id,
    };
    setChatSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
    setInputText("");
  };

  const handleDeleteChat = (sessionId: string) => {
    setChatSessions(prev => prev.filter(session => session.id !== sessionId));
    if (sessionId === currentSessionId) {
      const remainingSessions = chatSessions.filter(session => session.id !== sessionId);
      if (remainingSessions.length > 0) {
        setCurrentSessionId(remainingSessions[0].id);
      }
    }
  };

  const handleEditChat = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setEditingSessionId(sessionId);
      setEditingTitle(session.title);
    }
  };

  const handleSaveEdit = () => {
    if (editingSessionId && editingTitle.trim()) {
      setChatSessions(prev => prev.map(session => {
        if (session.id === editingSessionId) {
          return { ...session, title: editingTitle.trim() };
        }
        return session;
      }));
      setEditingSessionId(null);
      setEditingTitle("");
    }
  };

  const handleCancelEdit = () => {
    setEditingSessionId(null);
    setEditingTitle("");
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setChatSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [...session.messages, userMessage],
          lastUpdated: new Date(),
          title: session.title === "New Chat" ? inputText.slice(0, 30) + "..." : session.title,
        };
      }
      return session;
    }));

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

      setChatSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, aiMessage],
            lastUpdated: new Date(),
          };
        }
        return session;
      }));
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
    <div className="flex h-screen bg-slate-50">
      {/* Chat History Sidebar */}
      <div className="w-72 bg-slate-100 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <img
                      src="https://api.dicebear.com/7.x/personas/svg?seed=Nala" // Placeholder for user avatar
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <h1 className="text-xl font-bold text-slate-800">Inbox</h1>
            </div>
            <Button
              onClick={handleNewChat}
              variant="ghost"
              size="icon"
              className="ml-auto"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search chat..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-200 border-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {chatSessions.filter(session => selectedTeam ? session.teamId === selectedTeam.id : true).map((session) => (
              <div
                key={session.id}
                className={`group relative rounded-lg transition-colors ${currentSessionId === session.id ? "bg-blue-50" : "hover:bg-slate-50"}`}
              >
                <button
                  onClick={() => setCurrentSessionId(session.id)}
                  className={`w-full text-left p-3 flex items-center justify-between ${currentSessionId === session.id ? "text-blue-700" : ""}`}
                >
                  {editingSessionId === session.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="h-8 text-sm"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit();
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEdit();
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/personas/svg?seed=Nala" // Placeholder for avatar
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-slate-800">
                            {session.title}
                          </div>
                          <div className="text-sm text-slate-600 truncate">
                            {session.messages[session.messages.length - 1]?.text}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditChat(session.id);
                          }}
                          className="h-8 w-8 p-0 hover:bg-slate-200"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChat(session.id);
                          }}
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col bg-white shadow-inner">
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
            {currentSession?.messages.map((message) => (
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
    </div>
  );
}
