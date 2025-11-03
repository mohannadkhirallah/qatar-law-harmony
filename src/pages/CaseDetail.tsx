import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, FileText, History, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ComparisonPanel } from '@/features/cases/ui/ComparisonPanel';
import { AnnotationSection } from '@/features/cases/ui/AnnotationSection';
import { mockCases } from '@/shared/data/mockData';
import { CaseStatus } from '@/core/domain/entities/Case';
import { toast } from 'sonner';

export default function CaseDetail() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  
  const case_ = mockCases.find(c => c.id === caseId);
  
  const [recommendation, setRecommendation] = useState(case_?.recommendationText || '');
  const [decision, setDecision] = useState<'validate' | 'reject' | ''>('');
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Ahmed Al-Mansoori',
      role: 'Legal Analyst',
      text: 'Initial review shows clear contradiction between Article 15 and Article 22. The temporal precedence suggests Law 7/2014 should take priority.',
      timestamp: new Date(2024, 0, 15, 10, 30),
    },
  ]);

  if (!case_) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Case Not Found</h2>
        <p className="text-muted-foreground mb-4">The requested case could not be found.</p>
        <Button onClick={() => navigate('/cases')}>Back to Cases</Button>
      </div>
    );
  }

  // Mock document data for comparison
  const leftDocument = {
    id: case_.documentIds[0],
    lawNumber: '7',
    year: 2014,
    title: 'Commercial Companies Law',
    jurisdiction: 'Federal',
    articles: [
      {
        number: '15',
        text: 'Any company wishing to engage in commercial activities must register with the Ministry of Commerce and Industry within thirty days of its establishment. Failure to register within this period shall result in administrative penalties.',
        highlighted: true,
      },
      {
        number: '16',
        text: 'The registration process shall include submission of articles of association, proof of capital deposit, and identification documents of all founding members.',
      },
      {
        number: '17',
        text: 'Upon successful registration, the company shall receive a commercial registration certificate valid for one year, renewable annually.',
      },
    ],
  };

  const rightDocument = {
    id: case_.documentIds[1] || case_.documentIds[0],
    lawNumber: '9',
    year: 2002,
    title: 'Business Registration Act',
    jurisdiction: 'Federal',
    articles: [
      {
        number: '22',
        text: 'All commercial entities must complete registration procedures within sixty days of commencement of operations. Registration may be completed at any authorized registration office.',
        highlighted: true,
      },
      {
        number: '23',
        text: 'The registration fee shall be determined based on the capital and type of commercial activity.',
      },
      {
        number: '24',
        text: 'Entities operating without proper registration shall be subject to fines not exceeding 50,000 Riyals.',
      },
    ],
  };

  const handleAddComment = (text: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: 'Current User',
      role: 'Legal Analyst',
      text,
      timestamp: new Date(),
    };
    setComments([...comments, newComment]);
    toast.success('Comment added successfully');
  };

  const handleSubmitDecision = () => {
    if (!decision) {
      toast.error('Please select a decision');
      return;
    }
    if (!recommendation.trim()) {
      toast.error('Please provide a recommendation');
      return;
    }

    toast.success(`Case ${decision === 'validate' ? 'validated' : 'rejected'} successfully`);
    setTimeout(() => navigate('/cases'), 1500);
  };

  const getCaseTypeColor = (type: string) => {
    switch (type) {
      case 'contradiction':
        return 'destructive';
      case 'overlap':
        return 'default';
      case 'gap':
        return 'secondary';
      default:
        return 'outline';
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

  const formatStatus = (status: CaseStatus) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/cases">Cases</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Case #{case_.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/cases')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cases
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">
                Case #{case_.id} – {case_.caseType.charAt(0).toUpperCase() + case_.caseType.slice(1)} Analysis
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={getCaseTypeColor(case_.caseType)}>
                  {case_.caseType.replace('_', ' ')}
                </Badge>
                <Badge variant="outline">
                  {formatStatus(case_.status)}
                </Badge>
                {case_.severity && (
                  <Badge variant={getSeverityColor(case_.severity)}>
                    {case_.severity} severity
                  </Badge>
                )}
              </div>
            </div>
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Flagged By</p>
              <p className="text-sm">{case_.flaggedBy}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Flagged Date</p>
              <p className="text-sm">{case_.flaggedDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
              <p className="text-sm">
                {case_.assignedTo ? `Reviewer #${case_.assignedTo}` : 'Unassigned'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Documents Involved</p>
              <p className="text-sm">{case_.documentIds.join(', ')}</p>
            </div>
          </div>
          
          {case_.status === CaseStatus.VALIDATED && case_.validatedBy && (
            <>
              <Separator />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <History className="h-4 w-4" />
                <span>Validated by {case_.validatedBy} on {case_.validationDate?.toLocaleDateString()}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <ComparisonPanel
          document={leftDocument}
          highlightedArticles={['15']}
          side="left"
        />
        <ComparisonPanel
          document={rightDocument}
          highlightedArticles={['22']}
          side="right"
        />
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contradiction Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium">Key Differences Identified:</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Registration timeframe: 30 days (Law 7/2014) vs. 60 days (Law 9/2002)</li>
              <li>Penalty specification differs between laws</li>
              <li>Temporal precedence: Law 7/2014 is more recent</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <AnnotationSection
        caseId={case_.id}
        comments={comments}
        onAddComment={handleAddComment}
      />

      <Card>
        <CardHeader>
          <CardTitle>Decision & Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Decision</Label>
            <Select value={decision} onValueChange={(value: any) => setDecision(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select decision" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="validate">Validate – Contradiction Confirmed</SelectItem>
                <SelectItem value="reject">Reject – False Positive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Recommendation</Label>
            <Textarea
              placeholder="Provide your detailed recommendation for resolving this contradiction..."
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => navigate('/cases')}>
              Cancel
            </Button>
            <Button onClick={handleSubmitDecision} disabled={!decision || !recommendation.trim()}>
              {decision === 'validate' ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Validate Case
                </>
              ) : (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Case
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
