import Link from 'next/link'
import { useRouter } from 'next/router'
import { navItems } from '../config/navItems'

export default function Header() {
    const { pathname } = useRouter()

    return (
        <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee' }}>
            <nav style={{ display: 'flex', gap: '1.5rem' }}>
                {navItems.map(({ label, path }) => (
                    <Link key={path} href={path}>
                        <a style={{
                            fontWeight: pathname === path ? 'bold' : 'normal',
                            color: pathname === path ? '#0070f3': '#000'
                        }}>
                            {label}
                        </a>
                    </Link>
                ))}
            </nav>
        </header>
    )
}