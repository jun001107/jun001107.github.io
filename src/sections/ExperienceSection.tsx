import experience from '../content/experience.json';

export default function ExperienceSection() {
    return (
        <section id="experience" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-4xl font-heading font-semibold mb-2">Experience</h2>
                <div className="h-1 w-16 bg-gray-300 mb-8"></div>

                {/* Two-column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {experience.map((item, idx) => (
                        <div key={idx} className="relative group">
                            {/* Hover perimeter effect */}
                            <div className="absolute inset-0 bg-gray-400 transform translate-x-4 translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-none"></div>

                            {/* Card */}
                            <div className="relative bg-white p-6 flex flex-col border-2 border-transparent group-hover:border-gray-400 transition-all duration-300 shadow-md group-hover:shadow-xl">
                                <h4 className="text-xl font-semibold mb-1 leading-tight">{item.role}</h4>
                                <p className="uppercase text-gray-500 text-sm mb-2">{item.company}</p>
                                <span className="inline-block text-gray-700 text-sm border border-gray-300 rounded-full px-3 py-1 mb-4">
                  {item.period}
                </span>
                                {item.location && (
                                    <p className="text-gray-500 text-sm mb-4">{item.location}</p>
                                )}
                                <ul className="space-y-2 text-gray-700 text-sm flex-1">
                                    {item.points.map((pt, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="mr-2 mt-1 text-lg leading-none">◦</span>
                                            <span className="leading-relaxed">{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}