import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  isRTL?: boolean;
}

export function RecommendationSection({ recommendation, isRTL = false }: RecommendationSectionProps) {
  // Construct a comprehensive LLM-style response
  const recommendationText = `Based on a comprehensive legal analysis, it is recommended to apply Law ${recommendation.applicableLaw.lawNumber}/${recommendation.applicableLaw.year} - "${recommendation.applicableLaw.title}".

${recommendation.applicableLaw.rationale}

Legal Framework Analysis:
${recommendation.legalBasis.map((basis, index) => 
  `${index + 1}. ${basis.principle}: ${basis.description}`
).join('\n\n')}

Detailed Analysis:
${recommendation.explanatoryNote}

${recommendation.alternativeApproach ? `\nAlternative Consideration:\n${recommendation.alternativeApproach}` : ''}`;

  return (
    <Card className="border-success/30 bg-success/5 shadow-elegant">
      <CardHeader className="border-b bg-success/10 rounded-t-lg">
        <CardTitle className={`flex items-center gap-3 text-xl ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <Lightbulb className="h-5 w-5 text-success" />
          {isRTL ? 'التوصية المُنشأة بالذكاء الاصطناعي' : 'AI-Generated Recommendation'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {recommendationText.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('Legal Framework Analysis:') || 
                paragraph.startsWith('Detailed Analysis:') || 
                paragraph.startsWith('Alternative Consideration:')) {
              const [title, ...content] = paragraph.split('\n');
              return (
                <div key={index} className="space-y-3">
                  <h3 className="text-base font-semibold text-primary border-b border-border pb-2">{title}</h3>
                  <div className="pl-4 space-y-2">
                    {content.map((line, lineIndex) => (
                      <p key={lineIndex} className="text-sm leading-relaxed text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <p key={index} className="text-sm leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
