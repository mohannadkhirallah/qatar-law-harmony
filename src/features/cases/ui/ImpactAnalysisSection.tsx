import { Building2, Users, Scale, AlertCircle, DollarSign, Gavel } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ImpactData {
  affectedAgencies: Array<{
    name: string;
    role: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  affectedStakeholders: Array<{
    category: string;
    description: string;
    impactLevel: 'high' | 'medium' | 'low';
  }>;
  consequences: Array<{
    type: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
  }>;
  riskAssessment: {
    complianceRisk: number;
    litigationRisk: number;
    operationalRisk: number;
  };
}

interface ImpactAnalysisSectionProps {
  impact: ImpactData;
  isRTL?: boolean;
}

export function ImpactAnalysisSection({ impact, isRTL = false }: ImpactAnalysisSectionProps) {
  const getImpactColor = (level: string) => {
    switch (level) {
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

  const getImpactIcon = (type: string) => {
    switch (type) {
      case 'compliance':
        return Scale;
      case 'litigation':
        return Gavel;
      case 'financial':
        return DollarSign;
      default:
        return AlertCircle;
    }
  };

  return (
    <Card className="border-warning/30 shadow-elegant">
      <CardHeader className="border-b bg-warning/5 rounded-t-lg">
        <CardTitle className={`flex items-center gap-3 text-xl ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <AlertCircle className="h-5 w-5 text-warning" />
          {isRTL ? 'تحليل التأثير وتقييم المخاطر' : 'Impact Analysis & Risk Assessment'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Affected Regulatory Agencies */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Affected Regulatory Agencies
          </h4>
          <div className="space-y-2">
            {impact.affectedAgencies.map((agency, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 rounded-lg border bg-background"
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm">{agency.name}</p>
                  <p className="text-xs text-muted-foreground">{agency.role}</p>
                </div>
                <Badge variant={getImpactColor(agency.impact)}>
                  {agency.impact} impact
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Affected Stakeholders */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Affected Stakeholders
          </h4>
          <div className="space-y-2">
            {impact.affectedStakeholders.map((stakeholder, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 rounded-lg border bg-background"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{stakeholder.category}</p>
                    <Badge variant={getImpactColor(stakeholder.impactLevel)} className="text-xs">
                      {stakeholder.impactLevel}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stakeholder.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Consequences */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Likely Consequences</h4>
          <div className="space-y-2">
            {impact.consequences.map((consequence, index) => {
              const Icon = getImpactIcon(consequence.type);
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-background"
                >
                  <div className={`p-2 rounded-md ${
                    consequence.severity === 'high' ? 'bg-destructive/10' :
                    consequence.severity === 'medium' ? 'bg-warning/10' :
                    'bg-muted'
                  }`}>
                    <Icon className={`h-4 w-4 ${
                      consequence.severity === 'high' ? 'text-destructive' :
                      consequence.severity === 'medium' ? 'text-warning' :
                      'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm capitalize">{consequence.type} Risk</p>
                      <Badge variant={getImpactColor(consequence.severity)} className="text-xs">
                        {consequence.severity} severity
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {consequence.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Risk Assessment Summary */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Risk Assessment Summary</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Compliance Risk</span>
                <span className="text-xs font-bold">{impact.riskAssessment.complianceRisk}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${impact.riskAssessment.complianceRisk}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Litigation Risk</span>
                <span className="text-xs font-bold">{impact.riskAssessment.litigationRisk}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning transition-all"
                  style={{ width: `${impact.riskAssessment.litigationRisk}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Operational Risk</span>
                <span className="text-xs font-bold">{impact.riskAssessment.operationalRisk}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-destructive transition-all"
                  style={{ width: `${impact.riskAssessment.operationalRisk}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
