import React from 'react';
import { formatDateTime } from '@/utils/time';

interface StatusBarProps {
  title: string;
  timestamp: Date;
}

const StatusBar: React.FC<StatusBarProps> = ({ title, timestamp }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-8 flex justify-between items-center px-6 pt-2 z-40 pointer-events-none">
      <div className="text-xs font-semibold text-gray-800/80 backdrop-blur-md bg-white/30 px-3 py-1 rounded-full shadow-sm border border-white/20">
        {title}
      </div>
      <div className="text-xs font-semibold text-gray-800/80 backdrop-blur-md bg-white/30 px-3 py-1 rounded-full tabular-nums shadow-sm border border-white/20">
        {formatDateTime(timestamp)}
      </div>
    </div>
  );
};

export default StatusBar;
