import { Brain, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface AIAnalysisData {
  detectionMethod: string;
  confidence: number;
  textSimilarity: number;
  semanticOverlap: number;
  logicalInconsistency: boolean;
  keyFindings: string[];
  legalPrinciples: string[];
}

interface AIAnalysisSectionProps {
  analysis: AIAnalysisData;
  isRTL?: boolean;
}

export function AIAnalysisSection({ analysis, isRTL = false }: AIAnalysisSectionProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getConfidenceLabel = (score: number) => {
    if (score >= 80) return 'High Confidence';
    if (score >= 60) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <Card className="border-primary/30 bg-gradient-subtle shadow-elegant">
      <CardHeader className="border-b bg-primary/5 rounded-t-lg">
        <CardTitle className={`flex items-center gap-3 text-xl ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <Brain className="h-5 w-5 text-primary" />
          {isRTL ? 'تحليل التناقضات بالذكاء الاصطناعي' : 'AI-Powered Contradiction Analysis'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Detection Metrics */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Confidence</span>
              <span className={`text-sm font-bold ${getConfidenceColor(analysis.confidence)}`}>
                {analysis.confidence}%
              </span>
            </div>
            <Progress value={analysis.confidence} className="h-2" />
            <Badge variant={analysis.confidence >= 80 ? 'default' : 'secondary'} className="text-xs">
              {getConfidenceLabel(analysis.confidence)}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Semantic Overlap</span>
              <span className="text-sm font-bold">{analysis.semanticOverlap}%</span>
            </div>
            <Progress value={analysis.semanticOverlap} className="h-2" />
            <p className="text-xs text-muted-foreground">Contextual meaning similarity</p>
          </div>
        </div>

        <Separator />

        {/* Key Findings Table */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Key Findings
          </h4>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium">Column 1</th>
                  <th className="px-4 py-2 text-left text-xs font-medium">Column 2</th>
                  <th className="px-4 py-2 text-left text-xs font-medium">Column 3</th>
                  <th className="px-4 py-2 text-left text-xs font-medium">Column 4</th>
                  <th className="px-4 py-2 text-left text-xs font-medium">Column 5</th>
                </tr>
              </thead>
              <tbody>
                {analysis.keyFindings.map((finding, index) => {
                  const parts = finding.split(':');
                  const mainText = parts[0];
                  const description = parts[1] || '';
                  
                  return (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium">{mainText}</td>
                      <td className="px-4 py-3 text-sm">{description}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge variant="outline" className="text-xs">Detected</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
