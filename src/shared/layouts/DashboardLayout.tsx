import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/shared/components/AppSidebar';
import { AppHeader } from '@/shared/components/AppHeader';
import { Outlet } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export function DashboardLayout() {
  const { isRTL } = useLanguage();

  return (
    <SidebarProvider>
      <div className={`flex min-h-screen w-full ${isRTL ? 'flex-row-reverse' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1 p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
