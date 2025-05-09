import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react';

interface ProjectCardProps {
    name: string;
    url: string;
    image: string;
    frameworks: string[];
    html: string;
}

export default function ProjectCard({ name, url, image, frameworks, html }: ProjectCardProps) {
    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden flex flex-col h-full">
            {/* 이미지 영역 */}
            <div className="relative w-full h-0 pb-[56.25%]">
                <Image
                    src={image}
                    alt={`${name} screenshot`}
                    fill
                    className="object-cover"
                />
            </div>

            {/* 콘텐츠 */}
            <div className="p-6 flex flex-col flex-1">
                {/* 카테고리 태그 (고정 또는 동적) */}
                <span className="inline-block bg-gray-700 text-sm text-gray-300 px-3 py-1 rounded-full mb-4">
          AI &amp; ML
        </span>

                {/* 제목 */}
                <h3 className="text-xl font-semibold text-white mb-2">
                    <Link href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {name}
                    </Link>
                </h3>

                {/* 설명 (HTML) */}
                <div
                    className="text-gray-300 flex-1 mb-4 space-y-2"
                    dangerouslySetInnerHTML={{ __html: html }}
                />

                {/* 스택 태그 */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {frameworks.map((fw) => (
                        <span
                            key={fw}
                            className="bg-gray-700 text-gray-200 text-sm px-2 py-1 rounded-full"
                        >
              {fw}
            </span>
                    ))}
                </div>

                {/* 소스 코드 링크 */}
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center text-gray-400 hover:text-gray-200"
                >
                    <Github className="mr-2" size={16} />
                    Source Code
                </a>
            </div>
        </div>
    )
}