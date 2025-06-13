
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
import { ChartBar, DollarSign, ChartPie } from "lucide-react";

const menuItems = [
  {
    title: "Portfolio Analysis",
    icon: ChartPie,
    description: "Analyze funding portfolios",
  },
  {
    title: "Market Trends",
    icon: ChartBar,
    description: "Track market movements",
  },
  {
    title: "Investment Metrics",
    icon: DollarSign,
    description: "Key performance indicators",
  },
];

const analysisTypes = [
  "Startup Funding",
  "Venture Capital",
  "Private Equity",
  "IPO Analysis",
  "Market Valuation",
  "Risk Assessment",
];

export function AppSidebar() {
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
          <SidebarGroupLabel className="text-slate-700 font-semibold">Analysis Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="hover:bg-blue-50 hover:text-blue-700 transition-colors">
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

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold">Quick Analysis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analysisTypes.map((type) => (
                <SidebarMenuItem key={type}>
                  <SidebarMenuButton className="hover:bg-slate-50 transition-colors text-sm">
                    <span>{type}</span>
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
