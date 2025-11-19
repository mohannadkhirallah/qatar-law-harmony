import { LayoutDashboard, FileText, Upload, AlertCircle, FileStack, Settings, Users, HelpCircle, Globe } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const mainItems = [
  { title: 'Dashboard', titleAr: 'لوحة المعلومات', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Documents', titleAr: 'الوثائق', url: '/documents', icon: FileText },
  { title: 'Upload', titleAr: 'رفع الملفات', url: '/upload', icon: Upload },
  { title: 'Cases', titleAr: 'القضايا', url: '/cases', icon: AlertCircle },
  { title: 'Subjects', titleAr: 'الموضوعات', url: '/subjects', icon: FileStack },
];

const adminItems = [
  { title: 'Users', titleAr: 'المستخدمين', url: '/users', icon: Users },
  { title: 'Settings', titleAr: 'الإعدادات', url: '/settings', icon: Settings },
];

const helpItems = [
  { title: 'Help', titleAr: 'المساعدة', url: '/help', icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { language, isRTL } = useLanguage();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar 
      className={isCollapsed ? 'w-16' : 'w-64'} 
      collapsible="icon"
      side={isRTL ? 'right' : 'left'}
    >
      <SidebarContent>
        <div className="flex items-center gap-3 px-4 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <FileStack className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">القانون</h2>
              <p className="text-xs text-sidebar-foreground/70">Legal System</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">{t('mainMenu', language)}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{language === 'ar' ? item.titleAr : item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">{t('administration', language)}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{language === 'ar' ? item.titleAr : item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {helpItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{language === 'ar' ? item.titleAr : item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
