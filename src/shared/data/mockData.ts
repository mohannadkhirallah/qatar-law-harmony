import { User, UserRole, UserStatus } from '@/core/domain/entities/User';
import { Document, DocumentStatus } from '@/core/domain/entities/Document';
import { Case, CaseType, CaseStatus } from '@/core/domain/entities/Case';
import { SubjectCategory } from '@/core/domain/entities/Subject';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed.mohammed@justice.gov.qa',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2025-11-03')
  },
  {
    id: '2',
    name: 'فاطمة علي',
    email: 'fatima.ali@justice.gov.qa',
    role: UserRole.LEGAL_ANALYST,
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-02-20'),
    lastLogin: new Date('2025-11-02')
  },
  {
    id: '3',
    name: 'خالد حسن',
    email: 'khaled.hassan@justice.gov.qa',
    role: UserRole.REVIEWER,
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-03-10'),
    lastLogin: new Date('2025-11-01')
  }
];

export const mockSubjects: SubjectCategory[] = [
  {
    id: '1',
    nameAr: 'التشريعات المدنية',
    nameEn: 'Civil Legislation',
    description: 'Laws related to civil matters',
    color: '#3B82F6'
  },
  {
    id: '2',
    nameAr: 'التشريعات الجنائية',
    nameEn: 'Criminal Legislation',
    description: 'Laws related to criminal matters',
    color: '#EF4444'
  },
  {
    id: '3',
    nameAr: 'التشريعات الاقتصادية',
    nameEn: 'Economic Legislation',
    description: 'Laws related to economic matters',
    color: '#10B981'
  },
  {
    id: '4',
    nameAr: 'التشريعات الإدارية',
    nameEn: 'Administrative Legislation',
    description: 'Laws related to administrative matters',
    color: '#F59E0B'
  },
  {
    id: '5',
    nameAr: 'التشريعات العمالية',
    nameEn: 'Labor Legislation',
    description: 'Laws related to labor and employment',
    color: '#8B5CF6'
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    lawNumber: 'قانون رقم 11',
    year: 2004,
    jurisdiction: 'قطر',
    titleAr: 'قانون المرافعات المدنية والتجارية',
    titleEn: 'Civil and Commercial Procedures Law',
    version: 1,
    uploadedBy: '2',
    uploadDate: new Date('2025-10-15'),
    subjectId: '1',
    filePath: '/documents/law-11-2004.pdf',
    status: DocumentStatus.ACTIVE,
    articleCount: 456
  },
  {
    id: '2',
    lawNumber: 'قانون رقم 14',
    year: 2014,
    jurisdiction: 'قطر',
    titleAr: 'قانون العمل',
    titleEn: 'Labor Law',
    version: 2,
    uploadedBy: '2',
    uploadDate: new Date('2025-10-20'),
    subjectId: '5',
    filePath: '/documents/law-14-2014.pdf',
    status: DocumentStatus.ACTIVE,
    articleCount: 123
  },
  {
    id: '3',
    lawNumber: 'قانون رقم 27',
    year: 2006,
    jurisdiction: 'قطر',
    titleAr: 'قانون التجارة',
    titleEn: 'Commercial Law',
    version: 1,
    uploadedBy: '2',
    uploadDate: new Date('2025-10-25'),
    subjectId: '3',
    filePath: '/documents/law-27-2006.pdf',
    status: DocumentStatus.ACTIVE,
    articleCount: 789
  }
];

export const mockCases: Case[] = [
  {
    id: '1',
    documentIds: ['1', '2'],
    caseType: CaseType.CONTRADICTION,
    flaggedBy: 'AI System',
    flaggedDate: new Date('2025-10-28'),
    status: CaseStatus.NEW,
    assignedTo: '3',
    severity: 'high',
    recommendationText: 'Review contradiction between civil procedures and labor law regarding notice periods.'
  },
  {
    id: '2',
    documentIds: ['2', '3'],
    caseType: CaseType.OVERLAP,
    flaggedBy: 'AI System',
    flaggedDate: new Date('2025-10-29'),
    status: CaseStatus.UNDER_REVIEW,
    assignedTo: '3',
    severity: 'medium'
  },
  {
    id: '3',
    documentIds: ['1'],
    caseType: CaseType.GAP,
    flaggedBy: 'AI System',
    flaggedDate: new Date('2025-10-30'),
    status: CaseStatus.VALIDATED,
    assignedTo: '3',
    validatedBy: '1',
    validationDate: new Date('2025-11-02'),
    severity: 'low'
  }
];

export const mockDashboardStats = {
  totalDocuments: 1247,
  flaggedCases: 89,
  validatedThisMonth: 23,
  avgProcessingTime: 4.5, // days
  topSubjects: [
    { subject: 'التشريعات المدنية', conflicts: 34 },
    { subject: 'التشريعات الجنائية', conflicts: 28 },
    { subject: 'التشريعات الاقتصادية', conflicts: 15 },
    { subject: 'التشريعات العمالية', conflicts: 8 },
    { subject: 'التشريعات الإدارية', conflicts: 4 }
  ]
};
