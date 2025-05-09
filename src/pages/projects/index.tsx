// pages/projects/index.tsx
import type { NextPage, GetStaticProps } from 'next'
import { useState, useMemo } from 'react'
import ProjectCard from '../../components/ProjectCard'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

type Project = {
    name: string
    url: string
    image: string
    frameworks: string[]
    contentHtml: string
    category: string
}

interface Props {
    projects: Project[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const projectsDir = path.join(process.cwd(), 'content/projects')
    const filenames = fs.readdirSync(projectsDir)

    const projects: Project[] = await Promise.all(
        filenames.map(async (filename) => {
            const filePath = path.join(projectsDir, filename)
            const fileContents = fs.readFileSync(filePath, 'utf8')
            const { data, content } = matter(fileContents)

            const processed = await remark().use(html).process(content)
            const contentHtml = processed.toString()

            return {
                name: String(data.name),
                url: String(data.url),
                image: String(data.image),
                frameworks: data.frameworks as string[],
                contentHtml,
                category: String(data.category || 'Uncategorized'),
            }
        })
    )

    return { props: { projects } }
}

const Projects: NextPage<Props> = ({ projects }) => {
    const categories = [
        'All Projects',
        'Web Development',
        'AI & ML',
        'Blockchain',
        'IoT',
    ]
    const [selectedCategory, setSelectedCategory] = useState('All Projects')
    const [searchTerm, setSearchTerm] = useState('')

    const filtered = useMemo(() => {
        return projects.filter((p) => {
            const matchCat =
                selectedCategory === 'All Projects' || p.category === selectedCategory
            const matchSearch = p.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            return matchCat && matchSearch
        })
    }, [projects, selectedCategory, searchTerm])

    return (
        <section className="px-4 py-8">
            <h2 className="text-3xl font-bold text-white mb-6">대표 프로젝트</h2>

            {/* Filter & Search Bar */}
            <div className="bg-gray-800 p-4 rounded-lg mb-8 flex flex-wrap items-center justify-between gap-4">
                {/* Category Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-gray-300 font-medium">Filter:</span>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1 rounded-full text-sm font-medium ${
                                selectedCategory === cat
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-700 text-gray-300'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((p, i) => (
                    <ProjectCard
                        key={i}
                        name={p.name}
                        url={p.url}
                        image={p.image}
                        frameworks={p.frameworks}
                        html={p.contentHtml}
                    />
                ))}
            </div>
        </section>
    )
}

export default Projects