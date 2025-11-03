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
}

export function AIAnalysisSection({ analysis }: AIAnalysisSectionProps) {
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
    <Card className="border-primary/30 bg-gradient-subtle">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI-Powered Contradiction Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Detection Metrics */}
        <div className="grid grid-cols-3 gap-4">
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
              <span className="text-sm font-medium">Text Similarity</span>
              <span className="text-sm font-bold">{analysis.textSimilarity}%</span>
            </div>
            <Progress value={analysis.textSimilarity} className="h-2" />
            <p className="text-xs text-muted-foreground">Lexical overlap between provisions</p>
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

        {/* Detection Method */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Detection Method</h4>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{analysis.detectionMethod}</Badge>
            {analysis.logicalInconsistency && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                Logical Inconsistency Detected
              </Badge>
            )}
          </div>
        </div>

        <Separator />

        {/* Key Findings */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Key Findings
          </h4>
          <ul className="space-y-2">
            {analysis.keyFindings.map((finding, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Legal Principles */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Applied Legal Principles</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.legalPrinciples.map((principle, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {principle}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
