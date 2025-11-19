import { FileText, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/shared/components/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockDashboardStats, mockCases } from '@/shared/data/mockData';
import { CaseType, CaseStatus } from '@/core/domain/entities/Case';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

export default function Dashboard() {
  const { language, isRTL } = useLanguage();

  const getCaseTypeColor = (type: CaseType) => {
    switch (type) {
      case CaseType.CONTRADICTION:
        return 'destructive';
      case CaseType.OVERLAP:
        return 'default';
      case CaseType.GAP:
        return 'secondary';
    }
  };

  const getCaseStatusColor = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.NEW:
        return 'default';
      case CaseStatus.UNDER_REVIEW:
        return 'secondary';
      case CaseStatus.VALIDATED:
        return 'outline';
      case CaseStatus.REJECTED:
        return 'destructive';
    }
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard', language)}</h1>
        <p className="text-muted-foreground mt-1">
          {language === 'ar' ? 'نظرة عامة على نظام التحليل القانوني' : 'Overview of the legal analysis system'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={language === 'ar' ? 'إجمالي المستندات' : 'Total Documents'}
          value={mockDashboardStats.totalDocuments.toLocaleString()}
          description={language === 'ar' ? 'القوانين في قاعدة البيانات' : 'Laws in database'}
          icon={FileText}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
          isRTL={isRTL}
        />
        <StatsCard
          title={language === 'ar' ? 'الحالات المُبلغ عنها' : 'Flagged Cases'}
          value={mockDashboardStats.flaggedCases}
          description={language === 'ar' ? 'تتطلب المراجعة' : 'Requiring review'}
          icon={AlertCircle}
          variant="warning"
          isRTL={isRTL}
        />
        <StatsCard
          title={language === 'ar' ? 'تم التحقق منها هذا الشهر' : 'Validated This Month'}
          value={mockDashboardStats.validatedThisMonth}
          description={language === 'ar' ? 'الحالات المكتملة' : 'Cases completed'}
          icon={CheckCircle}
          variant="success"
          trend={{ value: 8, isPositive: true }}
          isRTL={isRTL}
        />
        <StatsCard
          title={language === 'ar' ? 'متوسط وقت المعالجة' : 'Avg Processing Time'}
          value={language === 'ar' ? `${mockDashboardStats.avgProcessingTime} أيام` : `${mockDashboardStats.avgProcessingTime} days`}
          description={language === 'ar' ? 'من الرفع إلى الإشارة' : 'Upload to flag'}
          icon={Clock}
          variant="default"
          isRTL={isRTL}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className={isRTL ? 'text-right' : ''}>
            <CardTitle>{language === 'ar' ? 'الحالات الأخيرة' : 'Recent Cases'}</CardTitle>
            <CardDescription>{language === 'ar' ? 'أحدث التناقضات والتداخلات المُبلغ عنها' : 'Latest flagged contradictions and overlaps'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCases.slice(0, 3).map((case_) => (
                <div key={case_.id} className={`flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 space-y-2 ${isRTL ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <Badge variant={getCaseTypeColor(case_.caseType)}>
                        {t(case_.caseType as any, language)}
                      </Badge>
                      <Badge variant={getCaseStatusColor(case_.status)}>
                        {t(case_.status as any, language)}
                      </Badge>
                      {case_.severity && (
                        <Badge variant="outline" className="text-xs">
                          {t(case_.severity as any, language)} {language === 'ar' ? '' : 'severity'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? `معرف الحالة: ${case_.id} • تم الإبلاغ في ${case_.flaggedDate.toLocaleDateString('ar-SA')}` : `Case ID: ${case_.id} • Flagged on ${case_.flaggedDate.toLocaleDateString()}`}
                    </p>
                    {case_.recommendationText && (
                      <p className="text-sm">{case_.recommendationText}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={isRTL ? 'text-right' : ''}>
            <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <TrendingUp className="h-5 w-5 text-primary" />
              {language === 'ar' ? 'أهم مجالات التضارب' : 'Top Conflict Areas'}
            </CardTitle>
            <CardDescription>{language === 'ar' ? 'فئات الموضوعات التي تحتوي على أكثر التضاربات' : 'Subject categories with most conflicts'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDashboardStats.topSubjects.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-medium">{item.subject}</span>
                    <span className="text-sm font-bold text-primary">{item.conflicts}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full bg-gradient-primary rounded-full transition-all ${isRTL ? 'origin-right' : 'origin-left'}`}
                      style={{ width: `${(item.conflicts / mockDashboardStats.topSubjects[0].conflicts) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
