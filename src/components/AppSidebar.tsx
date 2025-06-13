
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
import { MessageCircle, BarChart3, Sparkles } from "lucide-react";

interface AppSidebarProps {
  activeView: "chat" | "analytics";
  onViewChange: (view: "chat" | "analytics") => void;
}

const menuItems = [
  {
    title: "AI Chat",
    icon: MessageCircle,
    view: "chat" as const,
    description: "Intelligent funding analysis",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    view: "analytics" as const,
    description: "Performance dashboard",
    gradient: "from-emerald-500 to-teal-600",
  },
];

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-slate-200/50 bg-white/95 backdrop-blur-md">
      <SidebarHeader className="px-6 py-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative flex items-center justify-between">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-6 w-6 text-blue-200" />
              <h2 className="font-bold text-xl">FundingAI</h2>
            </div>
            <p className="text-blue-200 text-sm font-medium">Analysis Platform</p>
          </div>
          <SidebarTrigger className="text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-200" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide mb-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={`
                      relative group rounded-xl p-4 transition-all duration-300 hover:shadow-lg
                      ${activeView === item.view 
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105` 
                        : 'hover:bg-slate-50 hover:shadow-md'
                      }
                    `}
                    onClick={() => onViewChange(item.view)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        p-2 rounded-lg transition-all duration-300
                        ${activeView === item.view 
                          ? 'bg-white/20' 
                          : 'bg-slate-100 group-hover:bg-slate-200'
                        }
                      `}>
                        <item.icon className={`h-5 w-5 ${activeView === item.view ? 'text-white' : 'text-slate-600'}`} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className={`font-semibold ${activeView === item.view ? 'text-white' : 'text-slate-800'}`}>
                          {item.title}
                        </span>
                        <span className={`text-xs ${activeView === item.view ? 'text-white/80' : 'text-slate-500'}`}>
                          {item.description}
                        </span>
                      </div>
                    </div>
                    {activeView === item.view && (
                      <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
                    )}
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
