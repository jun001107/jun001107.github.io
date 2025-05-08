import type { NextPage, GetStaticProps } from 'next';
import ProjectCard from '../../components/ProjectCard';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';


type Project = {
    name: string
    url: string
    image: string
    frameworks: string[]
    contentHtml: string
}

interface Props {
    projects: Project[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const projectsDir = path.join(process.cwd(), 'content/projects')
    const filenames = fs.readdirSync(projectsDir)

    const projects: Project[] = await Promise.all(
        filenames.map(async (filename) => {
            const filePath = path.join(projectsDir, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContents);

            const processed = await remark().use(html).process(content);
            const contentHtml = processed.toString();

            return {
                name: String(data.name),
                url: String(data.url),
                image: String(data.image),
                frameworks: data.frameworks as string[],
                contentHtml,
            };
        })
    )

    return {
        props: { projects }
    }
}

const Projects: NextPage<Props> = ({ projects }) => {
    return (
        <section>
            <h2>대표 프로젝트</h2>
            {projects.map((p, i) => (
                <ProjectCard
                    key={i}
                    name={p.name}
                    url={p.url}
                    image={p.image}
                    frameworks={p.frameworks}
                    html={p.contentHtml}
                />
            ))}
        </section>
    )
}

export default Projects