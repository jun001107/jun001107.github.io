import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/config/navItems';

export default function Header() {
    const pathname = usePathname();

    return (
        <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee' }}>
            <nav style={{ display: 'flex', gap: '1.5rem' }}>
                {navItems.map(({ label, path }) => (
                    <Link
                      key={path}
                      href={path}
                      style={{
                        fontWeight: pathname === path ? 'bold' : 'normal',
                        color: pathname === path ? '#0070f3' : '#000'
                      }}
                    >
                      {label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}