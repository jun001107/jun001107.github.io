interface ProjectCardProps {
    name: string
    url: string
    desc: string
}

export default function ProjectCard({ name, url, desc }: ProjectCardProps) {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: 6,
            padding: '1rem',
            marginBottom: '1.5rem'
        }}>
            <h3>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {name}
                </a>
            </h3>
            <p>{desc}</p>
        </div>
    )
}