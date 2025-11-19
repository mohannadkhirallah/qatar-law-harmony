type TranslationKey = 
  // Navigation
  | 'dashboard' | 'documents' | 'upload' | 'cases' | 'subjects' | 'settings' | 'help'
  | 'mainMenu' | 'administration'
  // Common
  | 'search' | 'filter' | 'export' | 'add' | 'edit' | 'delete' | 'save' | 'cancel' | 'submit'
  | 'back' | 'next' | 'previous' | 'loading' | 'error' | 'success'
  // Cases
  | 'flaggedCases' | 'newCases' | 'caseDetail' | 'caseType' | 'status' | 'assignedTo'
  | 'flaggedBy' | 'flaggedDate' | 'severity' | 'recommendation' | 'decision'
  | 'contradiction' | 'overlap' | 'gap' | 'new' | 'under_review' | 'validated' | 'rejected'
  | 'high' | 'medium' | 'low'
  // Case Detail
  | 'caseSummary' | 'documentsInvolved' | 'currentStatus' | 'severityLevel'
  | 'aiAnalysis' | 'impactAnalysis' | 'recommendationSection' | 'lawComparison'
  | 'commentsAnnotations' | 'finalRecommendation' | 'submitDecision'
  // Headers
  | 'profile' | 'language' | 'logout' | 'notifications'
  // Actions
  | 'addNewCase' | 'viewDetails' | 'assign' | 'validate' | 'reject'
  | 'exportPDF' | 'downloadReport'
  // Status messages
  | 'caseNotFound' | 'noResults' | 'selectDecision' | 'provideRecommendation'
  // User roles
  | 'admin' | 'legalAnalyst' | 'reviewer'
  // Misc
  | 'unassigned' | 'arabic' | 'english';

export const translations: Record<TranslationKey, { en: string; ar: string }> = {
  // Navigation
  dashboard: { en: 'Dashboard', ar: 'لوحة التحكم' },
  documents: { en: 'Documents', ar: 'المستندات' },
  upload: { en: 'Upload', ar: 'رفع' },
  cases: { en: 'Cases', ar: 'الحالات' },
  subjects: { en: 'Subjects', ar: 'الموضوعات' },
  settings: { en: 'Settings', ar: 'الإعدادات' },
  help: { en: 'Help', ar: 'المساعدة' },
  mainMenu: { en: 'Main Menu', ar: 'القائمة الرئيسية' },
  administration: { en: 'Administration', ar: 'الإدارة' },
  
  // Common
  search: { en: 'Search', ar: 'بحث' },
  filter: { en: 'Filter', ar: 'تصفية' },
  export: { en: 'Export', ar: 'تصدير' },
  add: { en: 'Add', ar: 'إضافة' },
  edit: { en: 'Edit', ar: 'تعديل' },
  delete: { en: 'Delete', ar: 'حذف' },
  save: { en: 'Save', ar: 'حفظ' },
  cancel: { en: 'Cancel', ar: 'إلغاء' },
  submit: { en: 'Submit', ar: 'إرسال' },
  back: { en: 'Back', ar: 'رجوع' },
  next: { en: 'Next', ar: 'التالي' },
  previous: { en: 'Previous', ar: 'السابق' },
  loading: { en: 'Loading...', ar: 'جاري التحميل...' },
  error: { en: 'Error', ar: 'خطأ' },
  success: { en: 'Success', ar: 'نجح' },
  
  // Cases
  flaggedCases: { en: 'Flagged Cases', ar: 'الحالات المُبلغ عنها' },
  newCases: { en: 'new', ar: 'جديد' },
  caseDetail: { en: 'Case Detail', ar: 'تفاصيل الحالة' },
  caseType: { en: 'Case Type', ar: 'نوع الحالة' },
  status: { en: 'Status', ar: 'الحالة' },
  assignedTo: { en: 'Assigned To', ar: 'المُعين إلى' },
  flaggedBy: { en: 'Flagged By', ar: 'تم الإبلاغ بواسطة' },
  flaggedDate: { en: 'Flagged Date', ar: 'تاريخ الإبلاغ' },
  severity: { en: 'Severity', ar: 'الخطورة' },
  recommendation: { en: 'Recommendation', ar: 'التوصية' },
  decision: { en: 'Decision', ar: 'القرار' },
  
  // Case Types and Status
  contradiction: { en: 'Contradiction', ar: 'تناقض' },
  overlap: { en: 'Overlap', ar: 'تداخل' },
  gap: { en: 'Gap', ar: 'فجوة' },
  new: { en: 'New', ar: 'جديد' },
  under_review: { en: 'Under Review', ar: 'قيد المراجعة' },
  validated: { en: 'Validated', ar: 'موثق' },
  rejected: { en: 'Rejected', ar: 'مرفوض' },
  high: { en: 'High', ar: 'عالي' },
  medium: { en: 'Medium', ar: 'متوسط' },
  low: { en: 'Low', ar: 'منخفض' },
  
  // Case Detail
  caseSummary: { en: 'Case Summary', ar: 'ملخص الحالة' },
  documentsInvolved: { en: 'Documents Involved', ar: 'المستندات المعنية' },
  currentStatus: { en: 'Current Status', ar: 'الحالة الحالية' },
  severityLevel: { en: 'Severity Level', ar: 'مستوى الخطورة' },
  aiAnalysis: { en: 'AI-Powered Contradiction Analysis', ar: 'تحليل التناقضات بالذكاء الاصطناعي' },
  impactAnalysis: { en: 'Impact Analysis & Risk Assessment', ar: 'تحليل التأثير وتقييم المخاطر' },
  recommendationSection: { en: 'AI-Generated Recommendation', ar: 'التوصية المُنشأة بالذكاء الاصطناعي' },
  lawComparison: { en: 'Law Comparison', ar: 'مقارنة القوانين' },
  commentsAnnotations: { en: 'Comments & Annotations', ar: 'التعليقات والملاحظات' },
  finalRecommendation: { en: 'Final Recommendation', ar: 'التوصية النهائية' },
  submitDecision: { en: 'Submit Decision', ar: 'إرسال القرار' },
  
  // Headers
  profile: { en: 'Profile', ar: 'الملف الشخصي' },
  language: { en: 'Language', ar: 'اللغة' },
  logout: { en: 'Logout', ar: 'تسجيل الخروج' },
  notifications: { en: 'Notifications', ar: 'الإشعارات' },
  
  // Actions
  addNewCase: { en: 'Add New Case', ar: 'إضافة حالة جديدة' },
  viewDetails: { en: 'View Details', ar: 'عرض التفاصيل' },
  assign: { en: 'Assign', ar: 'تعيين' },
  validate: { en: 'Validate Contradiction', ar: 'قبول التناقض كصحيح' },
  reject: { en: 'Reject - False Positive', ar: 'رفض - نتيجة إيجابية خاطئة' },
  exportPDF: { en: 'Export PDF', ar: 'تصدير PDF' },
  downloadReport: { en: 'Download Report', ar: 'تحميل التقرير' },
  
  // Status messages
  caseNotFound: { en: 'Case not found', ar: 'الحالة غير موجودة' },
  noResults: { en: 'No results found', ar: 'لا توجد نتائج' },
  selectDecision: { en: 'Please select a decision', ar: 'يرجى اختيار قرار' },
  provideRecommendation: { en: 'Please provide a recommendation', ar: 'يرجى تقديم توصية' },
  
  // User roles
  admin: { en: 'Admin', ar: 'مسؤول' },
  legalAnalyst: { en: 'Legal Analyst', ar: 'محلل قانوني' },
  reviewer: { en: 'Reviewer', ar: 'مراجع' },
  
  // Misc
  unassigned: { en: 'Unassigned', ar: 'غير معين' },
  arabic: { en: 'Arabic', ar: 'العربية' },
  english: { en: 'English', ar: 'الإنجليزية' },
};

export function t(key: TranslationKey, lang: 'en' | 'ar'): string {
  return translations[key]?.[lang] || key;
}
