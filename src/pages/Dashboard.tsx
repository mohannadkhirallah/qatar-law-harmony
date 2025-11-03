import { FileText, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/shared/components/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockDashboardStats, mockCases } from '@/shared/data/mockData';
import { CaseType, CaseStatus } from '@/core/domain/entities/Case';

export default function Dashboard() {
  const getCaseTypeColor = (type: CaseType) => {
    switch (type) {
      case CaseType.CONTRADICTION:
        return 'destructive';
      case CaseType.OVERLAP:
        return 'default';
      case CaseType.GAP:
        return 'secondary';
    }
  };

  const getCaseStatusColor = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.NEW:
        return 'default';
      case CaseStatus.UNDER_REVIEW:
        return 'secondary';
      case CaseStatus.VALIDATED:
        return 'outline';
      case CaseStatus.REJECTED:
        return 'destructive';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of the legal analysis system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Documents"
          value={mockDashboardStats.totalDocuments.toLocaleString()}
          description="Laws in database"
          icon={FileText}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Flagged Cases"
          value={mockDashboardStats.flaggedCases}
          description="Requiring review"
          icon={AlertCircle}
          variant="warning"
        />
        <StatsCard
          title="Validated This Month"
          value={mockDashboardStats.validatedThisMonth}
          description="Cases completed"
          icon={CheckCircle}
          variant="success"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Avg Processing Time"
          value={`${mockDashboardStats.avgProcessingTime} days`}
          description="Upload to flag"
          icon={Clock}
          variant="default"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Cases</CardTitle>
            <CardDescription>Latest flagged contradictions and overlaps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCases.slice(0, 3).map((case_) => (
                <div key={case_.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={getCaseTypeColor(case_.caseType)}>
                        {case_.caseType.replace('_', ' ')}
                      </Badge>
                      <Badge variant={getCaseStatusColor(case_.status)}>
                        {case_.status.replace('_', ' ')}
                      </Badge>
                      {case_.severity && (
                        <Badge variant="outline" className="text-xs">
                          {case_.severity} severity
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Case ID: {case_.id} • Flagged on {case_.flaggedDate.toLocaleDateString()}
                    </p>
                    {case_.recommendationText && (
                      <p className="text-sm">{case_.recommendationText}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Conflict Areas
            </CardTitle>
            <CardDescription>Subject categories with most conflicts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDashboardStats.topSubjects.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.subject}</span>
                    <span className="text-sm font-bold text-primary">{item.conflicts}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary rounded-full transition-all"
                      style={{ width: `${(item.conflicts / mockDashboardStats.topSubjects[0].conflicts) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
