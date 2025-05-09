import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <Header />
        <main className="py-4
            px-[clamp(5%,10vw,20%)]
            flex justify-between items-center">
          <Component {...pageProps} />
        </main>
        <Footer />
      </>
  )
}