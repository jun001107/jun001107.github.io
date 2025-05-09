import type { NextPage } from 'next'
import styles from '../../styles/about.module.css'
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
                <div className={styles.skillsGrid}>
                    {skills.map((skill) => (
                        <div key={skill.name} className={styles.skillCard}>
                            <span className={styles.skillName}>{skill.name}</span>
                            <span
                                className={`${styles.skillLevel} ${
                                    styles[skill.level.toLowerCase()]
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
            <div className={styles.blocksGrid}>
                {aboutBlocks.map(({ title, icon: Icon, items }) => (
                    <div key={title} className={styles.block}>
                        <div className={styles.blockHeader}>
                            <Icon className={styles.blockIcon} />
                            <h4 className={styles.blockTitle}>{title}</h4>
                        </div>
                        <ul className={styles.blockList}>
                            {items.map((item) => (
                                <li key={item} className={styles.blockListItem}>
                                    <ChevronRight className={styles.listIcon} />
                                    <span className={styles.listText}>{item}</span>
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