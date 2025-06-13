import { useState } from "react";
import { MessageCircle, BarChart3, Sparkles, PanelLeft, Settings, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useTeam } from "@/contexts/TeamContext";

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
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    view: "analytics" as const,
    description: "Performance dashboard",
    gradient: "from-blue-600 to-indigo-600",
  },
];

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { teams, selectedTeam, setSelectedTeam } = useTeam();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`
        h-screen flex flex-col bg-white border-r border-slate-200
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-72" : "w-16"}
      `}
    >
      {/* Sidebar Header */}
      <div className={`
        px-4 py-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 
        relative overflow-hidden flex items-center
        ${isOpen ? "justify-between" : "justify-center"}
      `}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className={`relative flex items-center ${isOpen ? "gap-3" : "gap-0"}`}>
          {/* <Sparkles className={`h-5 w-5 text-blue-200 ${!isOpen && "mx-auto"}`} /> */}
          {isOpen && <h2 className="font-bold text-lg text-white tracking-tight">FundingAI</h2>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={`
            text-white hover:bg-white/20 rounded-lg p-1.5
            transition-all duration-200 absolute right-3 top-1/2 -translate-y-1/2
            ${!isOpen && "right-1/2 translate-x-1/2"}
          `}
        >
          <PanelLeft className={`h-4 w-4 ${!isOpen ? "rotate-180" : ""}`}/>
        </Button>
      </div>
      
      {/* Team Exchange Dropdown */}
      <div className="p-4 border-b border-slate-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedTeam ? selectedTeam.name : "Select Team"}
              <span>&#9660;</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {teams.map((team) => (
              <DropdownMenuItem key={team.id} onClick={() => setSelectedTeam(team)}>
                {team.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sidebar Content (Navigation) */}
      <div className="flex-1 px-2 py-4 overflow-y-auto w-full">
        {isOpen && (
          <p className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-3 px-3">
            Navigation
          </p>
        )}
        <nav className="space-y-1.5 px-1.5">
          {menuItems.map((item) => (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <button 
                  className={`
                    relative group flex items-center rounded-lg p-2.5 transition-all w-full duration-200
                    ${isOpen ? "justify-start" : "justify-center"}
                    ${activeView === item.view 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-md` 
                      : 'hover:bg-slate-50 hover:shadow-sm'
                    }
                  `}
                  onClick={() => onViewChange(item.view)}
                >
                  <div className={`
                    p-1.5 rounded-md transition-all duration-200
                    ${activeView === item.view 
                      ? 'bg-white/20' 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                    }
                  `}>
                    <item.icon className={`h-4 w-4 ${activeView === item.view ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                  {isOpen && (
                    <div className="flex flex-col text-left ml-3">
                      <span className={`font-medium text-sm ${activeView === item.view ? 'text-white' : 'text-slate-700'}`}>
                        {item.title}
                      </span>
                      <span className={`text-xs ${activeView === item.view ? 'text-white/80' : 'text-slate-500'}`}>
                        {item.description}
                      </span>
                    </div>
                  )}
                </button>
              </TooltipTrigger>
              {!isOpen && <TooltipContent side="right">{item.title}</TooltipContent>}
            </Tooltip>
          ))}
        </nav>
      </div>

      {/* User Profile / Settings at the bottom */}
      <div className="mt-auto p-4 border-t border-slate-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-full justify-start rounded-lg pr-12">
              <div className="flex items-center gap-3">
                <img
                  src="https://api.dicebear.com/7.x/personas/svg?seed=Nala" // Placeholder for user avatar
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                {isOpen && (
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-slate-800">Jus Dev</span>
                    <span className="text-xs text-slate-500">Developer</span>
                  </div>
                )}
              </div>
              {isOpen && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  &#9660; {/* Down arrow */}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" side="right" forceMount>
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
      </div>
    </div>
  );
}
