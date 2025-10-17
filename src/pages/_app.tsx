import type { AppProps } from 'next/app'
import { ReactQueryProvider } from '../providers'
import '../styles/globals.css'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReactQueryProvider>
  )
}