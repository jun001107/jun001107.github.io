import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Layers, ChevronLeft, Share, Calendar, Zap, Shield } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { Project } from '@/types/app';

const ProjectsApp: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Detail View (App Store Product Page Style)
  if (selectedProject) {
    return (
      <div className="bg-white min-h-full animate-fadeIn text-gray-900 flex flex-col">
        {/* Navigation Bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 h-14 flex items-center justify-between shrink-0">
          <button 
            onClick={() => setSelectedProject(null)} 
            className="flex items-center gap-1 text-blue-600 hover:opacity-70 transition-opacity font-medium -ml-2 px-2 py-1"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-[17px]">Projects</span>
          </button>
          
          <div className="flex gap-4">
             <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors">
                <Share className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto p-6 md:p-8">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-10">
              {/* App Icon / Image */}
              <div className="shrink-0 shadow-2xl rounded-[2rem] overflow-hidden w-28 h-28 md:w-36 md:h-36 bg-gray-100 border border-gray-200">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Actions */}
              <div className="flex flex-col justify-center flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">
                  {selectedProject.title}
                </h1>
                <p className="text-gray-500 font-medium text-sm mb-5">
                  {selectedProject.tags[0]} • Junghoon Cho
                </p>
                
                <div className="flex gap-3">
                  <a
                    href={selectedProject.github || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-8 py-2 rounded-full font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 ${selectedProject.github ? '' : 'pointer-events-none opacity-50'}`}
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                  <button className="bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all text-blue-600 px-4 py-2 rounded-full font-bold text-sm">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 w-full mb-8" />

            {/* Stats / Highlights (Mocked for visuals) */}
            <div className="grid grid-cols-3 gap-4 mb-10 text-center">
              <div className="space-y-1">
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Timeline</div>
                <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold text-lg">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{selectedProject.timeline || 'TBD'}</span>
                </div>
              </div>
              <div className="border-l border-gray-100 space-y-1">
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Performance</div>
                <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold text-lg">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>{selectedProject.performance || 'N/A'}</span>
                </div>
              </div>
              <div className="border-l border-gray-100 space-y-1">
                 <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Role</div>
                 <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold text-lg">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>{selectedProject.role || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Main Description */}
            <div className="space-y-6 animate-slideUpFade">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">About this project</h2>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Motivation */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Motivation</h2>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {selectedProject.motivation}
                </p>
              </div>

              {/* Challenges */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Challenges</h2>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {selectedProject.challenges}
                </p>
              </div>

              {/* Learnings */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Learnings</h2>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {selectedProject.learnings}
                </p>
              </div>

              {/* Tags / Tech Stack */}
              <div>
                 <h2 className="text-xl font-bold text-gray-900 mb-3">Technologies</h2>
                 <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold border border-gray-200">
                      {tag}
                    </span>
                  ))}
                 </div>
              </div>

              {/* Preview Image (Larger) */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img src={selectedProject.image} alt="Preview" className="w-full h-auto" />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Main List View
  return (
    <div className="bg-[#f5f5f7] min-h-full p-6 animate-fadeIn text-gray-900">
      
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-8 pt-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Portfolio</span>
        </div>
        <div className="flex justify-between items-end border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Projects</h1>
            <p className="text-gray-500 mt-2 text-sm max-w-xl leading-relaxed">
              A collection of technical initiatives focusing on Large Language Models, MLOps infrastructure, and production-grade Machine Learning systems.
            </p>
          </div>
          <span className="text-sm font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full hidden sm:block">
            {PROJECTS.length} Items
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        {PROJECTS.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ring-1 ring-black/[0.03] cursor-pointer active:scale-[0.98]"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Floating Action Button */}
              <div 
                className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-gray-50 text-gray-400">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3 pl-2">
                  <a
                    href={project.github || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-gray-400 hover:text-gray-900 transition-colors ${project.github ? '' : 'pointer-events-none opacity-40'}`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <button className="text-gray-400 hover:text-gray-900 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 'Coming Soon' / View More Card */}
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-300 text-center min-h-[300px] group hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Layers className="w-8 h-8 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">More on GitHub</h3>
          <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
            Explore my full repositories, including research papers and open source contributions.
          </p>
          <button className="px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-semibold text-gray-700 hover:border-gray-300 hover:text-gray-900 transition-all">
            <a href="https://github.com/jun001107" rel="noreferrer" target="_blank">View All Repositories</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsApp;
