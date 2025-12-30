import React, { useState, useEffect } from 'react';
import { Heart, Share, Grid, ChevronLeft, LayoutGrid, Clock, Star, FolderOpen, Image as ImageIcon } from 'lucide-react';
import { PHOTOS } from '@/data/photos';
import { Photo } from '@/types/app';

const PhotosApp: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('library');

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedPhoto === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = PHOTOS.findIndex(p => p.id === selectedPhoto);
      
      if (e.key === 'ArrowLeft') {
        // Go to previous photo if exists
        if (currentIndex > 0) {
          setSelectedPhoto(PHOTOS[currentIndex - 1].id);
        }
      } else if (e.key === 'ArrowRight') {
        // Go to next photo if exists
        if (currentIndex < PHOTOS.length - 1) {
          setSelectedPhoto(PHOTOS[currentIndex + 1].id);
        }
      } else if (e.key === 'Escape') {
        // Close viewer
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  const SidebarItem = ({ id, icon: Icon, label, count }: { id: string, icon: any, label: string, count?: number }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
        activeTab === id 
          ? 'bg-blue-500/10 text-blue-600 font-medium' 
          : 'text-gray-600 hover:bg-black/5'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${activeTab === id ? 'text-blue-500' : 'text-gray-500'}`} />
        <span>{label}</span>
      </div>
      {count !== undefined && <span className="text-xs text-gray-400 font-medium">{count}</span>}
    </button>
  );

  return (
    <div className="h-full flex bg-white text-gray-900">
      {/* Sidebar - iOS/MacOS Style */}
      <div className="w-56 bg-[#f5f5f7] border-r border-gray-200 flex-col py-4 px-3 hidden md:flex shrink-0">
        <div className="mb-6 px-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Photos</h2>
          <div className="space-y-0.5">
            <SidebarItem id="library" icon={LayoutGrid} label="Library" count={PHOTOS.length} />
            <SidebarItem id="recents" icon={Clock} label="Recents" />
            <SidebarItem id="favorites" icon={Heart} label="Favorites" count={2} />
          </div>
        </div>
        
        <div className="px-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">My Albums</h2>
          <div className="space-y-0.5">
            <SidebarItem id="travel" icon={FolderOpen} label="Travel" count={4} />
            <SidebarItem id="work" icon={FolderOpen} label="Work" count={12} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        {/* Top Toolbar */}
        <div className="h-12 border-b border-gray-100 flex items-center justify-between px-4 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-lg font-bold text-black tracking-tight">Library</h1>
          <div className="flex bg-gray-100 p-0.5 rounded-lg">
             <button className="px-3 py-1 text-xs font-medium rounded-md bg-white shadow-sm text-black">All Photos</button>
             <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-black">Days</button>
             <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-black">Months</button>
          </div>
        </div>

        {/* Photo Grid - Masonry/Clean style */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-10">
            {PHOTOS.map((photo) => (
              <div 
                key={photo.id}
                onClick={() => setSelectedPhoto(photo.id)}
                className="relative aspect-square group cursor-pointer overflow-hidden rounded-md bg-gray-100"
              >
                <img 
                  src={photo.url} 
                  alt={photo.location}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-6 h-6 rounded-full bg-white/90 shadow-sm flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5 text-gray-600" />
                   </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center py-8">
            <p className="text-sm text-gray-500 font-medium">{PHOTOS.length} Photos, 1 Video</p>
          </div>
        </div>

        {/* Detail Modal / Lightbox */}
        {selectedPhoto !== null && (
          <div className="absolute inset-0 z-50 bg-white flex flex-col animate-fadeIn">
            {/* Toolbar */}
            <div className="h-14 flex items-center justify-between px-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="flex items-center gap-1 text-blue-600 font-medium hover:opacity-80 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
              <div className="flex gap-2 text-gray-900">
                <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold">{PHOTOS.find(p => p.id === selectedPhoto)?.location}</span>
                    <span className="text-[10px] text-gray-500 font-medium uppercase">{PHOTOS.find(p => p.id === selectedPhoto)?.date}</span>
                </div>
              </div>
              <div className="flex gap-4">
                 <button className="text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                 </button>
                 <button className="text-gray-500 hover:text-blue-500 transition-colors">
                    <Share className="w-5 h-5" />
                 </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center p-8 bg-[#f5f5f7] overflow-hidden">
              <img 
                src={PHOTOS.find(p => p.id === selectedPhoto)?.url} 
                alt="Selected"
                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosApp;
