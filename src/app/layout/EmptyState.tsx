import React from 'react';

interface EmptyStateProps {
  isVisible: boolean;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  isVisible,
  message = 'Select an app from the dock',
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none animate-pulse z-20">
      <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-medium bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
