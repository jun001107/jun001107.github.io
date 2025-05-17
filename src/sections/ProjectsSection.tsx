// ProjectsSection.tsx
import { useState } from "react";
import projects from "../content/projects.json";
import * as SiIcons from "react-icons/si";

export default function ProjectsSection() {
  // Build category list, including “All”
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  // Filter projects by category
  const filteredProjects = projects.filter(
      p => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
      <section id="projects" className="py-20 bg-[#E6F7F9]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section title */}
          <h2 className="text-4xl font-heading font-semibold mb-2">Projects</h2>
          <div className="h-1 w-16 bg-gray-300 mb-8" />

          {/* Category tabs – nowrap & horizontal scroll on small screens */}
          <div className="flex flex-nowrap space-x-4 mb-6 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === cat
                            ? "bg-gray-800 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                  {cat}
                </button>
            ))}
          </div>

          {/* Horizontal slider of cards */}
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex items-start space-x-8 snap-x snap-mandatory">
              {filteredProjects.map((project, index) => (
                  <div
                      key={index}
                      id={`card-${project.category.replace(/\s+/g, "-")}-${index}`}
                      className="relative flex-shrink-0 w-80 group"
                  >
                    {/* Card backdrop on hover */}
                    <div className="absolute inset-0 bg-gray-400 transform translate-x-4 translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-none" />

                    {/* Card itself */}
                    <div className="relative bg-white p-6 flex flex-col border-2 border-transparent group-hover:border-gray-400 transition-all duration-300 shadow-md group-hover:shadow-xl snap-center ring-0 group-hover:ring-gray-400">
                      {/* Title and category */}
                      <h4 className="text-xl font-semibold mb-1">{project.title}</h4>
                      <p className="uppercase text-gray-500 text-sm mb-2">{project.category}</p>

                      {/* Skills badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.skills.map(skill => (
                            <span
                                key={skill}
                                className="inline-block text-xs border border-gray-300 rounded-full px-2 py-1"
                            >
                        {skill}
                      </span>
                        ))}
                      </div>

                      {/* Optional image */}
                      {project.image && (
                          <img
                              src={project.image}
                              alt={project.title}
                              className="w-full object-cover mb-4 rounded-none"
                          />
                      )}

                      {/* Description bullets */}
                      <ul className="space-y-2 text-gray-700 text-sm">
                        {project.description.map((point, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2 mt-1 text-lg leading-none">◦</span>
                              <span className="leading-relaxed">{point}</span>
                            </li>
                        ))}
                      </ul>

                      {/* Logos for frameworks/langs */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.icons?.map(iconKey => {
                          // Convert e.g. "python" → "SiPython"
                          const pascal = iconKey
                              .split(/[^a-z0-9]+/i)
                              .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                              .join("");
                          const iconName = `Si${pascal}`;
                          const Icon = (SiIcons as any)[iconName];
                          return Icon ? (
                              <Icon
                                  key={iconKey}
                                  title={iconKey}
                                  className="text-2xl text-gray-600 hover:text-gray-800"
                              />
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}