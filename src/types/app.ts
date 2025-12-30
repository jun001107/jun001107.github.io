import React from 'react';
import { LucideIcon } from 'lucide-react';

export type AppId = 'about' | 'projects' | 'contact' | 'terminal' | 'photos';

export type WindowVariant = 'default' | 'terminal' | 'media';

export interface AppConfig {
  id: AppId;
  title: string;
  icon: LucideIcon;
  color: string;
  variant?: WindowVariant;
}

export interface WindowProps {
  id: AppId;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
  children: React.ReactNode;
  variant?: WindowVariant;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export interface Photo {
  id: number;
  url: string;
  location: string;
  date: string;
}

export interface Experience {
  title: string;
  subtitle: string;
  date: string;
}

export interface Education {
  school: string;
  degree: string;
  date: string;
  gpa?: string;
}

export interface SkillGroup {
  label: string;
  tags: string[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  website: string;
  avatar?: string;
  experiences: Experience[];
  education: Education[];
  skills: SkillGroup[];
}
