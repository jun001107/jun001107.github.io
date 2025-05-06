import type { NextPage, GetStaticProps } from 'next'
import ProjectCard from '../components/ProjectCard'
import projects from '../../_data/projects.json'

type Project = {
    name: string
    url: string
    desc: string
}

interface Props {
    projects: Project[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        props: {
            projects: projects as Project[]
        }
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
                    desc={p.desc}
                />
            ))}
        </section>
    )
}

export default Projects