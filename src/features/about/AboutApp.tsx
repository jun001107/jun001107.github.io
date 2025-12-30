import React from 'react';
import { MapPin, GraduationCap, Briefcase, Code2, Globe, Mail, ChevronRight } from 'lucide-react';
import { PROFILE } from '@/data/profile';

const AboutApp: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-8 animate-fadeIn text-gray-900">
      
      {/* Header Profile Section */}
      <div className="flex flex-col items-center pt-8 pb-8">
        <div className="relative group cursor-pointer">
           <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200 shadow-xl relative z-10 bg-gray-50">
            <img 
              src={PROFILE.avatar || "https://picsum.photos/seed/junghoon/400/400"} 
              alt={PROFILE.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/junghoon/400/400";
              }}
            />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mt-4 tracking-tight">{PROFILE.name}</h1>
        <p className="text-gray-500 font-medium mt-1 text-sm">{PROFILE.title}</p>
        
        <div className="flex gap-2 mt-4">
          <SocialButton icon={Mail} label="Email" />
          <SocialButton icon={Globe} label="Website" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:px-8">
        
        {/* Bio Section - Spans full width */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 hover:shadow-md transition-shadow">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 ml-1">About</h2>
          <p className="text-gray-700 leading-relaxed text-[15px] font-normal">
            I am a Computer Science student at <span className="text-gray-900 font-semibold">McGill University</span> with professional experience in building production-grade AI systems. 
            Previously at <span className="text-gray-900 font-semibold">ROKAF IT Directorate</span>, I engineered high-throughput LLM inference APIs and MLOps pipelines.
            I'm passionate about bridging state-of-the-art research with reliable infrastructure.
          </p>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200/60 hover:shadow-md transition-shadow flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-500" />
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Experience</h2>
          </div>
          <div className="p-2 space-y-1">
             {PROFILE.experiences.map((exp) => (
               <ListItem 
                 key={exp.title + exp.date}
                 title={exp.title}
                 subtitle={exp.subtitle}
                 date={exp.date}
               />
             ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200/60 hover:shadow-md transition-shadow flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-500" />
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Education</h2>
          </div>
          <div className="p-2 space-y-1">
             {PROFILE.education.map((edu) => (
               <ListItem 
                 key={edu.school + edu.degree}
                 title={edu.school}
                 subtitle={edu.degree}
                 date={edu.date}
               />
             ))}
             {PROFILE.education.find((e) => e.gpa) && (
               <div className="px-3 py-2 flex justify-between items-center text-xs text-gray-400">
                  <span>GPA</span>
                  <span className="text-gray-600 font-medium bg-gray-100 px-1.5 py-0.5 rounded">
                    {PROFILE.education.find((e) => e.gpa)?.gpa}
                  </span>
               </div>
             )}
          </div>
        </div>

        {/* Skills Section - Spans full width */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 hover:shadow-md transition-shadow">
           <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Technical Arsenal</h2>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {PROFILE.skills.map((group) => (
                <SkillGroup key={group.label} label={group.label} tags={group.tags} />
              ))}
           </div>
        </div>
        
        <div className="md:col-span-2 flex justify-center mt-4">
           <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <MapPin className="w-3 h-3" />
              <span>{PROFILE.location}</span>
           </div>
        </div>

      </div>
    </div>
  );
};

const SocialButton: React.FC<{ icon: any, label: string }> = ({ icon: Icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-95 transition-all text-xs font-semibold text-gray-700 border border-gray-200">
    <Icon className="w-3.5 h-3.5 text-gray-500" />
    <span>{label}</span>
  </button>
);

const ListItem: React.FC<{ title: string, subtitle: string, date: string }> = ({ title, subtitle, date }) => (
  <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-default">
    <div>
      <div className="text-gray-900 text-sm font-semibold">{title}</div>
      <div className="text-gray-500 text-xs mt-0.5">{subtitle}</div>
    </div>
    <div className="flex items-center gap-2">
      <div className="text-gray-400 text-xs font-medium tabular-nums">{date}</div>
      <ChevronRight className="w-3 h-3 text-gray-300" />
    </div>
  </div>
);

const SkillGroup: React.FC<{ label: string, tags: string[] }> = ({ label, tags }) => (
  <div>
    <div className="text-[10px] text-gray-400 mb-2.5 font-bold uppercase tracking-widest">{label}</div>
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag} className="px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs text-gray-600 font-medium hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-default">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default AboutApp;
