import skills from '../content/skills.json';
import * as SiIcons from 'react-icons/si';

export default function SkillsSection() {
    return (
        <section id="skills" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-heading font-semibold mb-2">Skills</h2>
                <div className="h-1 w-16 bg-gray-300 mb-8"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill, index) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        const Icon = SiIcons[skill.icon];
                        return (
                            <div key={index} className="flex items-start space-x-4">
                                {Icon && <Icon className="text-3xl text-gray-600" />}
                                <div>
                                    <h3 className="text-lg font-semibold uppercase mb-1">{skill.title}</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">{skill.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}