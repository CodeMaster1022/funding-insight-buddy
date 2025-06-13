
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { MessageCircle, BarChart } from "lucide-react";

interface AppSidebarProps {
  activeView: "chat" | "analytics";
  onViewChange: (view: "chat" | "analytics") => void;
}

const menuItems = [
  {
    title: "AI Chat",
    icon: MessageCircle,
    view: "chat" as const,
    description: "Analyze funding and market data",
  },
  {
    title: "Analytics",
    icon: BarChart,
    view: "analytics" as const,
    description: "View funding table data",
  },
];

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="px-4 py-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h2 className="font-bold text-lg">FundingAI</h2>
            <p className="text-blue-200 text-sm">Analysis Dashboard</p>
          </div>
          <SidebarTrigger className="text-white hover:bg-blue-600 rounded-md p-2" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold">Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={`hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                      activeView === item.view ? 'bg-blue-100 text-blue-700' : ''
                    }`}
                    onClick={() => onViewChange(item.view)}
                  >
                    <item.icon className="h-5 w-5" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs text-slate-500">{item.description}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
