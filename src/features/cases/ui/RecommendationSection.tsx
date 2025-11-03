import { Lightbulb, CheckCircle, BookOpen, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface RecommendationData {
  applicableLaw: {
    lawNumber: string;
    year: number;
    title: string;
    articles: string[];
    rationale: string;
  };
  legalBasis: Array<{
    principle: string;
    description: string;
  }>;
  explanatoryNote: string;
  implementationSteps: string[];
  alternativeApproach?: string;
}

interface RecommendationSectionProps {
  recommendation: RecommendationData;
}

export function RecommendationSection({ recommendation }: RecommendationSectionProps) {
  return (
    <Card className="border-success/30 bg-success/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-success" />
          AI-Generated Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recommended Law to Apply */}
        <div className="p-4 rounded-lg bg-background border-2 border-success/20">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-md bg-success/10">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Recommended Law to Apply</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Based on legal principles analysis and temporal precedence
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default" className="font-mono">
                  Law {recommendation.applicableLaw.lawNumber}/{recommendation.applicableLaw.year}
                </Badge>
                <span className="text-sm font-medium">
                  {recommendation.applicableLaw.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {recommendation.applicableLaw.articles.map((article, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    Article {article}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-3 p-3 rounded-md bg-muted/50">
            <p className="text-sm font-medium mb-1">Rationale:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {recommendation.applicableLaw.rationale}
            </p>
          </div>
        </div>

        <Separator />

        {/* Legal Basis */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Legal Principles Framework
          </h4>
          <div className="space-y-3">
            {recommendation.legalBasis.map((basis, index) => (
              <div key={index} className="p-3 rounded-lg border bg-background">
                <p className="font-medium text-sm mb-1">{basis.principle}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {basis.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Explanatory Note */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Detailed Explanatory Note
          </h4>
          <div className="p-4 rounded-lg border bg-background">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {recommendation.explanatoryNote}
            </p>
          </div>
        </div>

        <Separator />

        {/* Implementation Steps */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Recommended Implementation Steps</h4>
          <ol className="space-y-2">
            {recommendation.implementationSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm flex-1 pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {recommendation.alternativeApproach && (
          <>
            <Separator />
            <div className="p-3 rounded-lg bg-muted/50 border">
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                Alternative Approach:
              </p>
              <p className="text-sm">{recommendation.alternativeApproach}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
