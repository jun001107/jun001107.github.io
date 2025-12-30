import { User, Briefcase, Mail, Terminal, Image as ImageIcon } from 'lucide-react';
import { AppConfig } from '@/types/app';

export const APPS: AppConfig[] = [
  {
    id: 'about',
    title: 'Profile',
    icon: User,
    color: 'bg-blue-500',
    variant: 'media',
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: Briefcase,
    color: 'bg-purple-500',
    variant: 'media',
  },
  {
    id: 'photos',
    title: 'Photos',
    icon: ImageIcon,
    color: 'bg-pink-500',
    variant: 'media',
  },
  {
    id: 'terminal',
    title: 'Terminal AI',
    icon: Terminal,
    color: 'bg-zinc-800',
    variant: 'terminal',
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: Mail,
    color: 'bg-green-500',
    variant: 'default',
  },
];
