export enum DocumentStatus {
  DRAFT = 'draft',
  PROCESSING = 'processing',
  ACTIVE = 'active',
  ARCHIVED = 'archived'
}

export interface Document {
  id: string;
  lawNumber: string;
  year: number;
  jurisdiction: string;
  titleAr: string;
  titleEn: string;
  version: number;
  uploadedBy: string;
  uploadDate: Date;
  subjectId: string;
  filePath: string;
  processedText?: string;
  status: DocumentStatus;
  articleCount?: number;
}
