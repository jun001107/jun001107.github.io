import Image from 'next/image';

interface ProjectCardProps {
    name: string;
    url: string;
    image: string;
    frameworks: string[];
    html: string;
}

export default function ProjectCard({ name, url, image, frameworks, html }: ProjectCardProps) {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: 6,
            padding: '1rem',
            marginBottom: '1.5rem'
        }}>
            <Image src={image} alt={`${name} screenshot`} width={200} height={200} />
            <h3>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {name}
                </a>
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem' }}>
                {frameworks.map((framework) => (
                    <li key={framework}>{framework}</li>
                ))}
            </ul>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}