import edu from '../content/education.json';
import schoolPhoto from '../assets/images/mcgill.jpeg';

export default function EducationSection() {
    return (
        <section id="education" className="py-20 bg-[#E6F7F9] min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title and Logo */}
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-4xl font-heading font-semibold">Education</h2>
                </div>
                <div className="h-1 w-16 bg-gray-300 mb-12"></div>

                <div className="flex flex-col md:flex-row">
                    {/* Classes List */}
                    <div className="md:w-1/3 mb-10 md:mb-0">
                        <h3 className="text-xl font-semibold mb-4">Classes:</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {edu.classes.map((cls) => (
                                <li key={cls} className="text-sm leading-relaxed">{cls}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Degree Cards & Photo */}
                    <div className="md:w-2/3 flex flex-col md:flex-row md:space-x-8">
                        {edu.degrees.map((deg) => (
                            <div key={deg.title} className="relative mb-8 md:mb-0 group md:w-1/2">
                                {/* Grey offset background (appears on hover) */}
                                <div className="absolute inset-0 bg-gray-400 transform translate-x-4 translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                                {/* Card container */}
                                <div className="relative bg-white p-6 flex flex-col border-2 border-transparent group-hover:border-gray-400 transition-all duration-300">
                                    <h4 className="text-2xl font-semibold mb-2 leading-tight">{deg.title}</h4>
                                    <p className="uppercase text-gray-500 text-sm mb-4">{deg.institution}</p>
                                    <span className="inline-block text-gray-700 text-sm border border-gray-300 rounded-full px-3 py-1 mb-6">
                    {deg.period}
                  </span>
                                    <hr className="border-gray-200 mb-6" />
                                    <ul className="space-y-3 flex-1">
                                        {deg.points.map((pt) => (
                                            <li key={pt} className="flex items-start text-gray-700 text-base">
                                                <span className="mr-3 mt-1 text-base leading-none">◦</span>
                                                <span className="leading-relaxed">{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

                        {/* School Photo (static) */}
                        <div className="w-full md:w-1/2 h-96 md:h-auto overflow-hidden">
                            <img
                                src={schoolPhoto}
                                alt="School"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
