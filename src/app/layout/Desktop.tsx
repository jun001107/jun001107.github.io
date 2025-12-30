import React from 'react';
import Window from '@/components/ui/Window';
import { AppConfig, AppId } from '@/types/app';

interface DesktopProps {
  apps: AppConfig[];
  openApps: AppId[];
  focusedApp: AppId | null;
  onClose: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  renderContent: (id: AppId) => React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({
  apps,
  openApps,
  focusedApp,
  onClose,
  onFocus,
  renderContent,
}) => {
  return (
    <main className="fixed inset-0 z-30 pointer-events-none">
      {openApps.map((appId, index) => {
        const appConfig = apps.find((app) => app.id === appId);
        if (!appConfig) return null;

        const isFocused = focusedApp === appId;
        const zIndex = 30 + index + (isFocused ? 100 : 0);

        return (
          <div key={appId} className="pointer-events-auto">
            <Window
              id={appId}
              title={appConfig.title}
              isOpen={true}
              onClose={() => onClose(appId)}
              onFocus={() => onFocus(appId)}
              zIndex={zIndex}
              variant={appConfig.variant}
            >
              {renderContent(appId)}
            </Window>
          </div>
        );
      })}
    </main>
  );
};

export default React.memo(Desktop);
