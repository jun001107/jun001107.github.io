export interface NavItem {
    label: string;
    path: string;
}

export const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about/' },
    { label: 'Academics', path: '/academics/' },
    { label: 'Projects', path: '/projects/' },
    { label: 'Contact', path: '/contact/' },
];