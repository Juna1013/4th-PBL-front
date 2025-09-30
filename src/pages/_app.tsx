import type { AppProps } from 'next/app'
import { ReactQueryProvider } from '../providers'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  )
}