import { useState } from 'react';
import { AlertCircle, Search, Filter, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { mockCases } from '@/shared/data/mockData';
import { CaseType, CaseStatus } from '@/core/domain/entities/Case';

export default function Cases() {
  const [searchQuery, setSearchQuery] = useState('');

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

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cases</h1>
          <p className="text-muted-foreground mt-1">Manage flagged contradictions, overlaps, and gaps</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {mockCases.map((case_) => (
          <Card key={case_.id} className="hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">Case #{case_.id}</h3>
                        <Badge variant={getCaseTypeColor(case_.caseType)}>
                          {case_.caseType.replace('_', ' ')}
                        </Badge>
                        <Badge variant={getCaseStatusColor(case_.status)}>
                          {case_.status.replace('_', ' ')}
                        </Badge>
                        {case_.severity && (
                          <Badge variant={getSeverityColor(case_.severity)}>
                            {case_.severity} severity
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Flagged by {case_.flaggedBy}</span>
                        <span>•</span>
                        <span>{case_.flaggedDate.toLocaleDateString()}</span>
                        {case_.assignedTo && (
                          <>
                            <span>•</span>
                            <span>Assigned to Reviewer #{case_.assignedTo}</span>
                          </>
                        )}
                      </div>
                      {case_.recommendationText && (
                        <p className="text-sm">{case_.recommendationText}</p>
                      )}
                      <div className="text-sm text-muted-foreground">
                        Documents involved: {case_.documentIds.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
