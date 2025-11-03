export enum CaseType {
  CONTRADICTION = 'contradiction',
  OVERLAP = 'overlap',
  GAP = 'gap'
}

export enum CaseStatus {
  NEW = 'new',
  UNDER_REVIEW = 'under_review',
  VALIDATED = 'validated',
  REJECTED = 'rejected'
}

export interface Case {
  id: string;
  documentIds: string[];
  caseType: CaseType;
  flaggedBy: string;
  flaggedDate: Date;
  status: CaseStatus;
  assignedTo?: string;
  validatedBy?: string;
  validationDate?: Date;
  recommendationText?: string;
  severity?: 'high' | 'medium' | 'low';
}
