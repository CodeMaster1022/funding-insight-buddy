
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-800">
                {activeView === "chat" ? "Funding Analysis AI" : "Fund Analytics Dashboard"}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">
                  {activeView === "chat" ? "AI Assistant Online" : "Data Updated"}
                </span>
              </div>
            </div>
          </header>
          
          <div className="flex-1 flex">
            {activeView === "chat" ? (
              <div className="flex-1 flex flex-col">
                <FundingMetrics />
                <ChatInterface />
              </div>
            ) : (
              <Analytics />
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
