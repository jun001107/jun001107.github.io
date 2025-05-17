// src/sections/AboutSection.tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import profilePic from '../assets/images/profile5.jpg';  // src/assets/images 에 넣은 후 import
import about from '../content/about.json';

export default function AboutSection() {
    return (
        <section
            id="about"
            className="flex flex-col md:flex-row md:items-center min-h-screen"
        >
            {/* 왼쪽: 사진 (화면 반쪽) */}
            <div className="w-full md:w-1/2 h-screen overflow-hidden">
                <img
                    src={profilePic}
                    alt={about.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 오른쪽: 텍스트 & 링크 */}
            <div className="w-full md:w-1/2">
                <div className="p-12 md:p-24 flex flex-col justify-center space-y-8">
                    <p className="text-gray-600 mb-10 leading-relaxed">{about.description}</p>
                    <ul className="space-y-4">
                        <li className="flex space-x-4 items-center">
                            <span className="font-semibold">Email:</span>
                            <a
                                href={`mailto:${about.email}`}
                                className="text-blue-600 hover:underline"
                            >
                                {about.email}
                            </a>
                        </li>
                        <li className="flex space-x-2">
                            <span className="font-semibold">LinkedIn:</span>
                            <a
                                href="https://linkedin.com/in/junghooncho117/"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {about.linkedin}
                            </a>
                        </li>
                        <li className="flex space-x-2">
                            <span className="font-semibold">GitHub:</span>
                            <a
                                href="https://github.com/jun001107"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {about.github}
                            </a>
                        </li>
                        <li className="flex space-x-2">
                            <span className="font-semibold">Resume:</span>
                            <a
                                href={about.resume}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Click here for Resume PDF
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}