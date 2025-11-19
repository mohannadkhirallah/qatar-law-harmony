import { Bell, Globe, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

export function AppHeader() {
  const navigate = useNavigate();
  const { language, isRTL, toggleLanguage } = useLanguage();

  const handleLogout = () => {
    navigate('/auth');
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className={`flex h-16 items-center gap-4 px-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <SidebarTrigger className={isRTL ? '-mr-2' : '-ml-2'} />
        
        <div className={`flex flex-1 items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className={`gap-2 shadow-sm transition-all hover:shadow-md ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Globe className="h-4 w-4" />
            <span className="font-medium">
              {language === 'en' ? 'العربية' : 'English'}
            </span>
          </Button>

          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className={`absolute ${isRTL ? '-left-1' : '-right-1'} -top-1 h-5 w-5 rounded-full p-0 text-xs`}>
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-56">
                <DropdownMenuLabel>
                  <div className={`flex flex-col space-y-1 ${isRTL ? 'text-right' : ''}`}>
                    <p className="text-sm font-medium">{language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed'}</p>
                    <p className="text-xs text-muted-foreground">{t('admin', language)}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={isRTL ? 'flex-row-reverse' : ''}>
                  <User className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('profile', language)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleLanguage} className={isRTL ? 'flex-row-reverse' : ''}>
                  <Globe className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('language', language)}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className={isRTL ? 'flex-row-reverse' : ''}>
                  <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('logout', language)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
