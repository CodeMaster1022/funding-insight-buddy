
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { FundingMetrics } from "@/components/FundingMetrics";
import { Analytics } from "@/components/Analytics";

const Index = () => {
  const [activeView, setActiveView] = useState<"chat" | "analytics">("chat");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-8 py-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
                  {activeView === "chat" ? "Funding Analysis AI" : "Analytics Dashboard"}
                </h1>
                <p className="text-slate-600 mt-1">
                  {activeView === "chat" ? "Intelligent insights for investment decisions" : "Comprehensive fund performance overview"}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute inset-0 h-3 w-3 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                </div>
                <span className="text-sm text-slate-700 font-medium">
                  {activeView === "chat" ? "AI Assistant Online" : "Live Data Feed"}
                </span>
              </div>
            </div>
          </header>
          
          <div className="flex-1 flex">
            {activeView === "chat" ? (
              <ChatInterface />
            ) : (
              <div className="flex-1 flex flex-col">
                <FundingMetrics />
                <Analytics />
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
