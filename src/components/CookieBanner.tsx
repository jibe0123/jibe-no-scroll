import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const CookieBanner = () => {
  const { consentStatus, acceptCookies, rejectCookies } = useCookieConsent();

  if (consentStatus !== 'pending') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-4xl mx-auto bg-background border-2 border-border rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between">
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold">🍪 Cookies & Confidentialité</h3>
              <p className="text-sm text-muted-foreground">
                Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience. 
                Les données sont collectées de manière anonyme conformément au RGPD.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <Button
                onClick={rejectCookies}
                variant="outline"
                className="flex-1 md:flex-none"
              >
                Refuser
              </Button>
              <Button
                onClick={acceptCookies}
                className="flex-1 md:flex-none"
              >
                Accepter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
