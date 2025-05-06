import type { NextPage } from 'next'

const Contact: NextPage = () => {
    return (
        <section>
            <h2>Contact</h2>
            <p>
                ✉️ Email: <a href="mailto:your.email@example.com">your.email@example.com</a>
            </p>
            <p>
                🔗 LinkedIn:{' '}
                <a href="https://www.linkedin.com/in/your-linkedin-id" target="_blank" rel="noopener noreferrer">
                    your-linkedin-id
                </a>
            </p>
        </section>
    )
}

export default Contact