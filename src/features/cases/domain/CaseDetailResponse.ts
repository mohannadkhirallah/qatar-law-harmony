import { CaseType, CaseStatus } from '@/core/domain/entities/Case';

export interface CaseDetailResponse {
  // Basic Case Info
  id: string;
  caseType: CaseType;
  status: CaseStatus;
  flaggedDate: string; // ISO date string
  assignedTo?: string;
  validatedBy?: string;
  validationDate?: string; // ISO date string
  severity?: 'high' | 'medium' | 'low';
  
  // Subject & Documents
  subject: {
    id: string;
    nameEn: string;
    nameAr: string;
  };
  
  documents: Array<{
    id: string;
    lawNumber: string;
    year: number;
    title: string;
    jurisdiction: string;
    articles: Array<{
      id: string;
      articleNumber: string;
      clauseText: string;
      effectiveDate?: string;
      version?: string;
    }>;
    flaggedArticles: string[]; // article IDs that are flagged
  }>;
  
  // AI Analysis Data
  aiAnalysis: {
    detectionMethod: string;
    confidence: number;
    textSimilarity: number;
    semanticOverlap: number;
    logicalInconsistency: boolean;
    keyFindings: string[];
    legalPrinciples: string[];
  };
  
  // Impact Analysis
  impactAnalysis: {
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
      type: string; // 'compliance' | 'litigation' | 'financial' | 'operational'
      description: string;
      severity: 'high' | 'medium' | 'low';
    }>;
    riskAssessment: {
      complianceRisk: number; // percentage
      litigationRisk: number; // percentage
      operationalRisk: number; // percentage
    };
  };
  
  // Recommendation
  recommendation: {
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
  };
  
  // Annotations & Comments
  annotations: Array<{
    id: string;
    userId: string;
    userName: string;
    userRole: string;
    content: string;
    timestamp: string; // ISO date string
    articleId?: string; // if annotation is tied to specific article
  }>;
  
  // Audit Trail
  auditLog: Array<{
    id: string;
    userId: string;
    userName: string;
    action: string; // 'created' | 'assigned' | 'viewed' | 'commented' | 'validated' | 'rejected'
    timestamp: string; // ISO date string
    details?: string;
  }>;
}
