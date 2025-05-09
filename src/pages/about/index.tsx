import type { NextPage } from 'next'

import {
    User,
    Code,
    GraduationCap,
    BookOpen,
    ChevronRight,
} from 'lucide-react'

const About: NextPage = () => {

    const skills = [
        { name: 'Python', level: 'advanced'},
        { name: 'Java', level: 'advanced'},
        { name: 'C++', level: 'advanced'},
        { name: 'PyTorch', level: 'advanced'},
        { name: 'TensorFlow', level: 'advanced'},
        { name: 'NLP', level: 'advanced'},
    ]

    const aboutBlocks = [
        {
        title: 'Personal Interests',
            icon: User,
        items: [
        'Exploring new technologies',
        'Solving algorithmic challenges',
        'Open-source contributions',
        'Web development projects',
    ],
    },
    {
        title: 'Coding Philosophy',
            icon: Code,
        items: [
        'Clean and maintainable code',
        'Focus on user experience',
        'Continuous learning and improvement',
        'Building with scalability in mind',
    ],
    },
    {
        title: 'Education Journey',
            icon: GraduationCap,
        items: [
        'Computer Science fundamentals',
        'Data structures and algorithms',
        'Machine learning and AI',
        'Self-taught web development',
    ],
    },
    {
        title: 'Future Goals',
            icon: BookOpen,
            items: [
            'Mastering advanced AI techniques',
            'Building impactful web applications',
            'Contributing to open-source projects',
            'Exploring blockchain development',
            ],
        },
    ]

    return (
        <section>
            <div className="flex justify-center mt-8">
              <p className="inline-block bg-green-950 text-green-300 text-sm font-medium px-3 py-1 rounded-full">
                About Me
              </p>
            </div>
            {/* Self Introduction */}
            <p className="mt-6 text-gray-300 leading-relaxed">
                I’m <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 font-bold">Junghoon (Alex) Cho</span>, a Computer Science student at McGill University, specializing in Artificial Intelligence. I’m particularly passionate about machine learning, with a strong interest in deep learning and its applications in computer vision and natural language processing.
                <br /><br />
                My journey in programming began with a curiosity to understand how things work under the hood. Over time, I gained experience with various programming languages like Python, Java, and C++, and developed a deep interest in building intelligent systems that learn from data.
                <br /><br />
                I’m driven by the challenge of turning complex problems into elegant solutions, and I enjoy working on projects that combine both analytical thinking and creativity. I value continuous learning, collaboration, and writing clean, maintainable code.
                <br /><br />
                When I’m not coding, I enjoy studying emerging tech trends, capturing moments through photography, and spending time exploring new ideas—both in code and in life.
            </p>

            {/* Professional Skills */}
            <h3 className="mt-4 text-5xl sm:text-3xl font-extrabold text-white">
                Professional Skills
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-8">
                {skills.map((skill) => (
                    <div key={skill.name} className="bg-[#1e1e2f] p-6 rounded text-center">
                        <span className="block font-bold mb-3 text-white">{skill.name}</span>
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-xs text-white ${
                                skill.level.toLowerCase() === "beginner"
                                    ? "bg-emerald-500"
                                    : skill.level.toLowerCase() === "intermediate"
                                        ? "bg-blue-500"
                                        : "bg-violet-500"
                            }`}>
                          {skill.level}
                        </span>
                    </div>
                ))}
            </div>

            {/* More About Me */}
            <h3 className="mt-4 text-5xl sm:text-3xl font-extrabold text-white">
                More About Me
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mt-8">
                {aboutBlocks.map(({ title, icon: Icon, items }) => (
                    <div key={title} className="bg-[#1e1e2f] p-6 rounded">
                        <div className="flex items-center mb-4">
                            <Icon className="bg-indigo-900 text-white p-2 rounded mr-3 w-8 h-8" />
                            <h4 className="text-white text-xl font-semibold">{title}</h4>
                        </div>
                        <ul className="list-none p-0 m-0">
                            {items.map((item) => (
                                <li key={item} className="flex items-start mb-2 text-slate-300">
                                    <ChevronRight className="mr-2 text-violet-500 w-4 h-4 shrink-0" />
                                    <span className="leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default About