import type { NextPage } from 'next'
import Link from 'next/link'

const Custom404: NextPage = () => {
    return (
        <section style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <h1>404 - Page Not Found</h1>
            <p>죄송합니다. 찾으시는 페이지가 없습니다.</p>
            <Link href="/">
                ← Go back home
            </Link>
        </section>
    )
}

export default Custom404