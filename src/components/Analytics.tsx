
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
    COMPLETED: { variant: "default" as const, className: "bg-green-100 text-green-800" },
    PROCESSING: { variant: "secondary" as const, className: "bg-blue-100 text-blue-800" },
    PENDING: { variant: "outline" as const, className: "bg-yellow-100 text-yellow-800" },
    FAILED: { variant: "destructive" as const, className: "bg-red-100 text-red-800" }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
  
  return (
    <Badge variant={config.variant} className={config.className}>
      {status}
    </Badge>
  );
};

export function Analytics() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="px-6 py-4 bg-white border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Fund Analytics</h2>
        <p className="text-sm text-slate-600">Monitor and analyze fund performance data</p>
      </div>
      
      <div className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-800">Fund Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ISIN</TableHead>
                    <TableHead>Fund Name</TableHead>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Fees</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Analysis Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fundAnalyses.map((fund) => (
                    <TableRow key={fund.id} className="hover:bg-slate-50">
                      <TableCell className="font-mono text-sm">{fund.isin}</TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {fund.fund_name}
                      </TableCell>
                      <TableCell>{fund.metadata.strategy}</TableCell>
                      <TableCell>{fund.metadata.fees}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {fund.metadata.performance}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {fund.metadata.risk_metrics}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(fund.status)}</TableCell>
                      <TableCell>{fund.created_by}</TableCell>
                      <TableCell className="text-slate-600">
                        {new Date(fund.analysis_date).toLocaleDateString()}
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
