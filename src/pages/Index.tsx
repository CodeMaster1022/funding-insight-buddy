
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { FundingMetrics } from "@/components/FundingMetrics";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-800">Funding Analysis AI</h1>
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">AI Assistant Online</span>
              </div>
            </div>
          </header>
          
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
              <FundingMetrics />
              <ChatInterface />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
