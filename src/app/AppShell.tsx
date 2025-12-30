import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplineBackground from '@/components/ui/SplineBackground';
import Dock from '@/components/ui/Dock';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { APPS } from '@/data/apps';
import { AppId } from '@/types/app';
import { useWindowManager } from './hooks/useWindowManager';
import StatusBar from './layout/StatusBar';
import Desktop from './layout/Desktop';
import EmptyState from './layout/EmptyState';
import AboutApp from '@/features/about/AboutApp';
import ProjectsApp from '@/features/projects/ProjectsApp';
import ContactApp from '@/features/contact/ContactApp';
import TerminalApp from '@/features/terminal/TerminalApp';
import PhotosApp from '@/features/photos/PhotosApp';

const AppShell: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { openApps, focusedApp, toggleApp, closeApp, focusApp } = useWindowManager();

  useEffect(() => {
    if (isLoading) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const renderAppContent = useCallback((id: AppId) => {
    switch (id) {
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'contact':
        return <ContactApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'photos':
        return <PhotosApp />;
      default:
        return null;
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <div className="relative w-screen h-screen overflow-hidden text-gray-900 antialiased bg-transparent">
        <SplineBackground />

        <StatusBar title="Junghoon's Portfolio" timestamp={currentTime} />

        <Desktop
          apps={APPS}
          openApps={openApps}
          focusedApp={focusedApp}
          onClose={closeApp}
          onFocus={focusApp}
          renderContent={renderAppContent}
        />

        <Dock onAppClick={toggleApp} activeApps={openApps} />

        <EmptyState isVisible={!isLoading && openApps.length === 0} />
      </div>
    </>
  );
};

export default AppShell;
