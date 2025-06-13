
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ChartBar, ChartPie } from "lucide-react";

const metrics = [
  {
    title: "Total Funding",
    value: "$2.4B",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Active Deals",
    value: "156",
    change: "+8.2%",
    icon: ChartBar,
    color: "text-blue-600",
  },
  {
    title: "Portfolio Value",
    value: "$847M",
    change: "+15.3%",
    icon: ChartPie,
    color: "text-purple-600",
  },
];

export function FundingMetrics() {
  return (
    <div className="p-6 bg-white border-b border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="hover:shadow-md transition-shadow border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{metric.value}</div>
              <p className={`text-xs ${metric.color} font-medium`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
