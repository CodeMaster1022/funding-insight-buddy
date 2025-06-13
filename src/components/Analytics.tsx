
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";

// Mock data based on the Fund Analyses table structure
const fundAnalyses = [
  {
    id: "1",
    isin: "IE00B4L5Y983",
    fund_name: "iShares Core MSCI World UCITS ETF",
    analysis_date: "2024-01-15",
    status: "COMPLETED",
    created_by: "John Doe",
    metadata: {
      strategy: "Global Equity",
      fees: "0.20%",
      performance: "12.5%",
      risk_metrics: "Medium"
    }
  },
  {
    id: "2",
    isin: "IE00B3RBWM25",
    fund_name: "Vanguard FTSE All-World UCITS ETF",
    analysis_date: "2024-01-14",
    status: "PROCESSING",
    created_by: "Jane Smith",
    metadata: {
      strategy: "Global Equity",
      fees: "0.22%",
      performance: "11.8%",
      risk_metrics: "Medium"
    }
  },
  {
    id: "3",
    isin: "IE00B1XNHC34",
    fund_name: "iShares Core S&P 500 UCITS ETF",
    analysis_date: "2024-01-13",
    status: "COMPLETED",
    created_by: "Mike Johnson",
    metadata: {
      strategy: "US Large Cap",
      fees: "0.07%",
      performance: "15.2%",
      risk_metrics: "Medium-High"
    }
  },
  {
    id: "4",
    isin: "IE00B52VJ196",
    fund_name: "iShares Core FTSE 100 UCITS ETF",
    analysis_date: "2024-01-12",
    status: "FAILED",
    created_by: "Sarah Wilson",
    metadata: {
      strategy: "UK Large Cap",
      fees: "0.07%",
      performance: "8.9%",
      risk_metrics: "Medium"
    }
  },
  {
    id: "5",
    isin: "IE00B6R52259",
    fund_name: "iShares MSCI Emerging Markets UCITS ETF",
    analysis_date: "2024-01-11",
    status: "PENDING",
    created_by: "David Brown",
    metadata: {
      strategy: "Emerging Markets",
      fees: "0.18%",
      performance: "9.3%",
      risk_metrics: "High"
    }
  }
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    COMPLETED: { variant: "default" as const, className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    PROCESSING: { variant: "secondary" as const, className: "bg-blue-100 text-blue-800 border-blue-200" },
    PENDING: { variant: "outline" as const, className: "bg-amber-100 text-amber-800 border-amber-200" },
    FAILED: { variant: "destructive" as const, className: "bg-red-100 text-red-800 border-red-200" }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
  
  return (
    <Badge variant={config.variant} className={`${config.className} font-medium px-3 py-1 rounded-full`}>
      {status}
    </Badge>
  );
};

const statsCards = [
  {
    title: "Total Funds",
    value: "5",
    icon: BarChart3,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Avg Performance",
    value: "11.2%",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Total AUM",
    value: "$2.1B",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Active Users",
    value: "4",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export function Analytics() {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <div className="px-8 py-6 bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Fund Analytics Dashboard</h2>
          <p className="text-slate-600">Comprehensive overview of fund performance and analytics</p>
        </div>
      </div>
      
      <div className="flex-1 p-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat) => (
            <Card key={stat.title} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Table */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50">
            <CardTitle className="text-xl text-slate-800 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Fund Analysis Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 hover:bg-slate-50/70 border-slate-200">
                    <TableHead className="font-semibold text-slate-700 py-4">ISIN</TableHead>
                    <TableHead className="font-semibold text-slate-700">Fund Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Strategy</TableHead>
                    <TableHead className="font-semibold text-slate-700">Fees</TableHead>
                    <TableHead className="font-semibold text-slate-700">Performance</TableHead>
                    <TableHead className="font-semibold text-slate-700">Risk</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Created By</TableHead>
                    <TableHead className="font-semibold text-slate-700">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fundAnalyses.map((fund, index) => (
                    <TableRow key={fund.id} className={`hover:bg-blue-50/50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                      <TableCell className="font-mono text-sm text-slate-600 py-4">{fund.isin}</TableCell>
                      <TableCell className="font-semibold max-w-[250px] text-slate-800">
                        <div className="truncate">{fund.fund_name}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                          {fund.metadata.strategy}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 font-medium">{fund.metadata.fees}</TableCell>
                      <TableCell className="text-emerald-600 font-bold text-lg">
                        {fund.metadata.performance}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                          {fund.metadata.risk_metrics}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(fund.status)}</TableCell>
                      <TableCell className="text-slate-700 font-medium">{fund.created_by}</TableCell>
                      <TableCell className="text-slate-600">
                        {new Date(fund.analysis_date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
