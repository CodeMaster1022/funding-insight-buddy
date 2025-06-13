
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, PieChart, ArrowUpRight } from "lucide-react";

const metrics = [
  {
    title: "Total Funding",
    value: "$2.4B",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    title: "Active Deals",
    value: "156",
    change: "+8.2%",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    title: "Portfolio Value",
    value: "$847M",
    change: "+15.3%",
    icon: PieChart,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

export function FundingMetrics() {
  return (
    <div className="p-8 bg-white/50 backdrop-blur-sm border-b border-slate-200/50">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Performance Overview</h2>
        <p className="text-slate-600">Key metrics and market indicators</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className={`group hover:shadow-xl transition-all duration-300 border-2 ${metric.borderColor} ${metric.bgColor} hover:scale-105`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-semibold text-slate-700 mb-1">
                  {metric.title}
                </CardTitle>
                <div className="text-3xl font-bold text-slate-800">{metric.value}</div>
              </div>
              <div className={`p-3 rounded-xl ${metric.bgColor} border ${metric.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 ${metric.color} font-bold`}>
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm">{metric.change}</span>
                </div>
                <span className="text-xs text-slate-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
