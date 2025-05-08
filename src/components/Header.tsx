import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { navItems } from '@/config/navItems';

export default function Header() {
    const pathname = usePathname();

    // Refs and state for indicator bar
    const linkRefs = useRef<HTMLElement[]>([]);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const index = navItems.findIndex(item => item.path === pathname);
        const el = linkRefs.current[index];
        if (el) {
            setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
        }
    }, [pathname]);


    return (
        <header className="
            py-4
            px-[clamp(5%,10vw,20%)]
            flex justify-between items-center
        ">
            <div style={{ fontWeight: 'bold', fontSize: '2rem', color: '#c27aff' }}>
                JHC
            </div>
            <nav className="relative flex gap-6">
                {navItems.map(({ label, path }, idx) => (
                    <Link
                      key={path}
                      href={path}
                      ref={el => { if (el) linkRefs.current[idx] = el as HTMLElement; }}
                      className={`
                        relative pb-2 transition-all duration-300
                        ${pathname === path ? 'text-purple-400': 'text-white-800'}
                      `}
                    >
                      {label}
                    </Link>
                ))}
                {/* Indicator Bar */}
                <span
                    className="absolute bottom-0 h-1 bg-purple-400 transition-all duration-300"
                    style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                />
            </nav>
        </header>
        // <header className="header">
        //     <div className="logo">
        //         JHC
        //     </div>
        //     <nav className="relative flex gap-6">
        //         {navItems.map(({ label, path }, idx) => (
        //             <Link
        //                 key={path}
        //                 href={path}
        //                 ref={el => { if (el) linkRefs.current[idx] = el as HTMLElement; }}
        //                 className={`nav-link ${pathname === path ? 'active' : ''}`}
        //             >
        //                 {label}
        //             </Link>
        //         ))}
        //         {/* Indicator Bar */}
        //         <span
        //             className="nav-indicator"
        //             style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        //         />
        //     </nav>
        // </header>
    );
}