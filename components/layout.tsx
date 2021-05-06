import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'

const name = 'Ishiya Yuki'
export const siteTitle = 'About→Ishiya Yuki'

export default function Layout({
    children,
    home,
}: {
    children: React.ReactNode
    home?: boolean
}) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Hello! I'm Yuki Ishiya. This website publish my profile and works. Please take your time."
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                <h1>{name}</h1>
            </header>
            <div className={styles.container}>
                <main>{children}</main>
                {!home && (
                    <div className={styles.backToHome}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
