import type {MouseEvent} from "react";

export type NavLinkProps = {
    id: string;
    onClick?: () => void;
    isActive?: boolean;
};

export default function NavLink({ id, onClick, isActive = false }: NavLinkProps) {

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick?.();  // 메뉴 토글, active 상태 변경 등
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <a
            href={`#${id}`}
            onClick={handleClick}
            className={`relative block px-4 py-2 transition ${
                isActive ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
        >
      <span
          className={`inline-block ${
              isActive ? 'line-through decoration-white decoration-2' : ''
          }`}
      >
        {id.replace(/-/g, ' ').toUpperCase()}
      </span>
        </a>
    );
}