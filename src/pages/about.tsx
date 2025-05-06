import type { NextPage } from 'next'

const About: NextPage = () => {
    return (
        <section>
            <h2>About Me</h2>
            <p>
                저는 McGill University에서 컴퓨터공학을 전공 중이며, 특히 ML과 풀스택 개발에 관심이 많습니다.
            </p>
            <ul>
                <li>🎓 Expected B.Sc. Graduation: Feb 2026</li>
                <li>💻 Skills: Python, TypeScript, React, Next.js, SQL, Git</li>
                <li>⚙️ Tools: Docker, AWS, GitHub Actions</li>
            </ul>
        </section>
    )
}

export default About