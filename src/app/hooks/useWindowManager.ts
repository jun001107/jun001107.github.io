import { useCallback, useState } from 'react';
import { AppId } from '@/types/app';

export const useWindowManager = () => {
  const [openApps, setOpenApps] = useState<AppId[]>([]);
  const [focusedApp, setFocusedApp] = useState<AppId | null>(null);

  const toggleApp = useCallback((id: AppId) => {
    setOpenApps((prev) => {
      if (prev.includes(id)) {
        setFocusedApp(id);
        return prev;
      }

      setFocusedApp(id);
      return [...prev, id];
    });
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setOpenApps((prev) => prev.filter((appId) => appId !== id));
    setFocusedApp((prev) => (prev === id ? null : prev));
  }, []);

  const focusApp = useCallback((id: AppId) => {
    setFocusedApp(id);
  }, []);

  return {
    openApps,
    focusedApp,
    toggleApp,
    closeApp,
    focusApp,
  };
};
