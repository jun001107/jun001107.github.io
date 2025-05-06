import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <Header />
        <main style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </>
  )
}