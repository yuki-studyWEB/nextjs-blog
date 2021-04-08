import '../styles/global.css'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

//This App component is the top-level component which will be common across all the different pages.
