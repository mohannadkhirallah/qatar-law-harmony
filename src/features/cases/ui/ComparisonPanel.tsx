import { useState } from 'react';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface Article {
  number: string;
  text: string;
  highlighted?: boolean;
}

interface DocumentData {
  id: string;
  lawNumber: string;
  year: number;
  title: string;
  jurisdiction: string;
  articles: Article[];
}

interface ComparisonPanelProps {
  document: DocumentData;
  highlightedArticles: string[];
  side: 'left' | 'right';
  isRTL?: boolean;
}

export function ComparisonPanel({ document, highlightedArticles, side, isRTL = false }: ComparisonPanelProps) {
  const [expandedArticles, setExpandedArticles] = useState<string[]>(highlightedArticles);

  const toggleArticle = (articleNumber: string) => {
    setExpandedArticles(prev =>
      prev.includes(articleNumber)
        ? prev.filter(a => a !== articleNumber)
        : [...prev, articleNumber]
    );
  };

  return (
    <Card className="h-full shadow-elegant border-border/50">
      <CardHeader className="border-b bg-muted/30 rounded-t-lg">
        <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>
            <CardTitle className="text-lg font-bold">
              {isRTL ? `القانون ${document.lawNumber}/${document.year}` : `Law ${document.lawNumber}/${document.year}`}
            </CardTitle>
            <p className="text-sm text-muted-foreground leading-relaxed">{document.title}</p>
            <Badge variant="outline" className="mt-1 text-xs">
              {document.jurisdiction}
            </Badge>
          </div>
          <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="space-y-2 p-4">
            {document.articles.map((article) => {
              const isHighlighted = highlightedArticles.includes(article.number);
              const isExpanded = expandedArticles.includes(article.number);

              return (
                <Collapsible
                  key={article.number}
                  open={isExpanded}
                  onOpenChange={() => toggleArticle(article.number)}
                >
                  <div
                    className={`rounded-lg border transition-all ${
                      isHighlighted
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border bg-background'
                    }`}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto"
                      >
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <span className="font-semibold">Article {article.number}</span>
                          {isHighlighted && (
                            <Badge variant="default" className="ml-2">
                              Flagged
                            </Badge>
                          )}
                        </div>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4 pt-2">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {article.text}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
