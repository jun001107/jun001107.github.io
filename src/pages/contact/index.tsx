import type { NextPage } from 'next'

const Contact: NextPage = () => {
    return (
        <section>
            <h2>Contact</h2>
            <p>
                ✉️ Email: <a href="mailto:junghoon.cho@mail.mcgill.ca">junghoon.cho@mail.mcgill.ca</a>
            </p>
            <p>
                🔗 LinkedIn:{' '}
                <a href="https://www.linkedin.com/in/junghooncho117" target="_blank" rel="noopener noreferrer">
                    Junghoon Cho
                </a>
            </p>
        </section>
    )
}

export default Contact