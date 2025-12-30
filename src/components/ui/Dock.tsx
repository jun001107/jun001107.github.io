import React from 'react';
import { motion } from 'framer-motion';
import { AppConfig, AppId } from '@/types/app';
import { APPS } from '@/data/apps';

interface DockProps {
  onAppClick: (appId: AppId) => void;
  activeApps: AppId[];
}

const Dock: React.FC<DockProps> = ({ onAppClick, activeApps }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      {/* 
        MacOS/VisionOS style dock container:
        - Glass background
        - Rounded corners
        - Subtle border
      */}
      <div className="flex items-end gap-3 px-3 py-3 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/50">
        {APPS.map((app) => (
          <DockItem 
            key={app.id} 
            app={app} 
            isActive={activeApps.includes(app.id)} 
            onClick={() => onAppClick(app.id)} 
          />
        ))}
      </div>
    </div>
  );
};

interface DockItemProps {
  app: AppConfig;
  isActive: boolean;
  onClick: () => void;
}

const DockItem: React.FC<DockItemProps> = ({ app, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.15, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group flex flex-col items-center gap-1"
    >
      <div className={`
        relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl 
        ${app.color} 
        shadow-lg transition-all duration-300
        group-hover:brightness-110
        border border-white/10
      `}>
        {/* Glossy Top Shine */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
        
        {/* Icon */}
        <app.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-md z-10" />
      </div>
      
      {/* Tooltip */}
      <span className="absolute -top-12 px-3 py-1 text-xs font-medium text-white/90 bg-gray-900/80 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none border border-white/10 shadow-xl transform scale-95 group-hover:scale-100 translate-y-2 group-hover:translate-y-0">
        {app.title}
      </span>
      
      {/* Active Indicator Dot (MacOS Style) */}
      <div className={`
        absolute -bottom-2 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]
        transition-all duration-300
        ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
      `} />
    </motion.button>
  );
};

export default Dock;
