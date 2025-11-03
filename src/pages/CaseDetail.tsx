import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, FileText, History, CheckCircle, XCircle, Download } from 'lucide-react';
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
import { AIAnalysisSection } from '@/features/cases/ui/AIAnalysisSection';
import { ImpactAnalysisSection } from '@/features/cases/ui/ImpactAnalysisSection';
import { RecommendationSection } from '@/features/cases/ui/RecommendationSection';
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

  // AI Analysis Data
  const aiAnalysis = {
    detectionMethod: 'Hybrid: Text Embeddings + Logical Entailment Model',
    confidence: 87,
    textSimilarity: 72,
    semanticOverlap: 84,
    logicalInconsistency: true,
    keyFindings: [
      'Temporal conflict: Different registration timeframes (30 days vs 60 days) for the same obligation',
      'Jurisdictional overlap: Both laws claim authority over commercial entity registration',
      'Penalty framework divergence: Varying enforcement mechanisms without coordination',
      'Subject matter identity: 92% semantic similarity in regulated activity scope',
      'Lex posterior principle applicable: Law 7/2014 supersedes Law 9/2002',
    ],
    legalPrinciples: [
      'Lex Posterior Derogat Priori',
      'Lex Specialis Derogat Generali',
      'In Dubio Pro Libertate',
      'Temporal Precedence Doctrine',
    ],
  };

  // Impact Analysis Data
  const impactAnalysis = {
    affectedAgencies: [
      {
        name: 'Ministry of Commerce and Industry (MOCI)',
        role: 'Primary registration authority and enforcement body',
        impact: 'high' as const,
      },
      {
        name: 'Qatar Financial Centre (QFC)',
        role: 'Regulatory oversight for financial services entities',
        impact: 'medium' as const,
      },
      {
        name: 'Ministry of Justice',
        role: 'Legal interpretation and dispute resolution',
        impact: 'medium' as const,
      },
    ],
    affectedStakeholders: [
      {
        category: 'New Business Entities',
        description: 'Companies establishing operations in Qatar face unclear compliance timelines, potentially resulting in inadvertent violations and administrative penalties.',
        impactLevel: 'high' as const,
      },
      {
        category: 'Legal Practitioners & Compliance Officers',
        description: 'Uncertainty in advising clients on proper registration procedures and timelines; increased liability exposure for professional advisors.',
        impactLevel: 'high' as const,
      },
      {
        category: 'Existing Commercial Entities',
        description: 'Businesses undergoing restructuring or expansion may face conflicting requirements for registration updates and renewals.',
        impactLevel: 'medium' as const,
      },
      {
        category: 'Courts & Judicial System',
        description: 'Increased litigation arising from enforcement actions under contradictory provisions; need for judicial interpretation and precedent establishment.',
        impactLevel: 'medium' as const,
      },
    ],
    consequences: [
      {
        type: 'compliance',
        description: 'Businesses may inadvertently violate registration deadlines due to conflicting timeframes, leading to administrative penalties ranging from 5,000 to 50,000 QAR. Regulatory uncertainty increases compliance costs by an estimated 15-25%.',
        severity: 'high' as const,
      },
      {
        type: 'litigation',
        description: 'High probability of legal challenges to enforcement actions. Companies penalized under one law may argue compliance with the other. Estimated 200+ cases annually requiring judicial interpretation.',
        severity: 'high' as const,
      },
      {
        type: 'financial',
        description: 'Delayed business formation and increased transaction costs. Foreign investment deterred by legal uncertainty. Estimated economic impact: 50-75 million QAR annually in delayed market entry.',
        severity: 'medium' as const,
      },
    ],
    riskAssessment: {
      complianceRisk: 85,
      litigationRisk: 72,
      operationalRisk: 68,
    },
  };

  // Recommendation Data
  const recommendationData = {
    applicableLaw: {
      lawNumber: '7',
      year: 2014,
      title: 'Commercial Companies Law',
      articles: ['15', '16', '17'],
      rationale: 'Law 7/2014 represents the more recent legislative intent and provides a more specific regulatory framework for commercial registration. Under the principle of lex posterior derogat priori (later law supersedes earlier law), the 30-day registration requirement in Article 15 should take precedence over the 60-day provision in Law 9/2002.',
    },
    legalBasis: [
      {
        principle: 'Lex Posterior Derogat Priori (Later Law Prevails)',
        description: 'When two laws regulate the same subject matter, the more recent enactment takes precedence absent explicit preservation clauses. Law 7/2014 was enacted 12 years after Law 9/2002, establishing clear temporal superiority.',
      },
      {
        principle: 'Lex Specialis Derogat Generali (Specific Law Prevails)',
        description: 'Law 7/2014 specifically addresses commercial companies, while Law 9/2002 provides general business registration provisions. The more specific statute governs when subject matter overlaps.',
      },
      {
        principle: 'Harmonious Construction Doctrine',
        description: 'Where possible, statutes should be interpreted to give effect to both. However, the direct contradiction in registration timeframes makes harmonious construction impossible, necessitating application of precedence rules.',
      },
    ],
    explanatoryNote: `This contradiction arises from incomplete legislative coordination during the enactment of Law 7/2014. While the newer law was intended to modernize commercial regulation, Article 41 of Law 9/2002 was not explicitly repealed.

Key Analysis:
1. Subject Matter Identity: Both provisions regulate the identical activity—initial commercial entity registration—creating direct conflict rather than complementary regulation.

2. Temporal Analysis: Law 7/2014's 30-day requirement represents deliberate policy to expedite market entry, aligning with Qatar National Vision 2030's business facilitation objectives.

3. Penalty Framework: Law 7/2014 provides graduated penalties (Articles 18-20) more proportionate to violation severity than Law 9/2002's fixed penalty structure.

4. International Alignment: The 30-day timeframe aligns with GCC commercial registration standards (UAE: 30 days, Saudi Arabia: 25 days, Bahrain: 30 days), supporting regional harmonization.

5. Administrative Practice: MOCI's current practice enforces the 30-day deadline, evidencing regulatory interpretation favoring Law 7/2014.

Recommended Resolution: Parliament should enact clarifying amendment explicitly repealing Article 22 of Law 9/2002 or inserting savings clause in Law 7/2014 definitively establishing temporal precedence.`,
    implementationSteps: [
      'Immediate regulatory clarification: MOCI to issue ministerial decree confirming 30-day registration requirement under Law 7/2014 as controlling provision',
      'Amnesty period: Establish 90-day grace period for entities currently in non-compliance due to contradiction uncertainty',
      'Legislative amendment: Draft proposed amendment to Law 7/2014 explicitly repealing Article 22 of Law 9/2002',
      'Stakeholder notification: Publish official gazette notice and conduct information sessions for business community and legal practitioners',
      'Training program: Implement training for MOCI registration officers on harmonized interpretation and enforcement procedures',
      'Monitoring mechanism: Establish 6-month review period to assess implementation effectiveness and address emergent issues',
    ],
    alternativeApproach: 'If immediate legislative amendment is impractical, a Supreme Judicial Council interpretive ruling could provide binding clarification across all courts, establishing Law 7/2014 precedence pending formal legislative harmonization.',
  };

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

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/cases')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cases
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Analysis Report (PDF)
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

      <AIAnalysisSection analysis={aiAnalysis} />

      <ImpactAnalysisSection impact={impactAnalysis} />

      <RecommendationSection recommendation={recommendationData} />

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
