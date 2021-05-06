import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import fetch from 'isomorphic-unfetch'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function Post({
    postData,
}: {
    postData: {
        title: string
        date: string
        body: string
        tags: { id: string; name: string }[]
        thumbnail: { url: string }
    }
}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <section>
                    <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                    <div
                        className={`${utilStyles.lightText} ${utilStyles.flex}`}
                    >
                        <Date dateString={postData.date} />
                        {postData.tags.map((tag) => (
                            <p
                                key={tag.id}
                                className={utilStyles.tag}
                                style={{ marginLeft: 10 }}
                            >
                                <span>{tag.name}</span>
                            </p>
                        ))}
                    </div>
                    <div>
                        <img
                            src={postData.thumbnail.url}
                            alt={postData.title}
                        />
                    </div>
                    <div
                        className={utilStyles.contents}
                        dangerouslySetInnerHTML={{ __html: postData.body }}
                    />
                </section>
            </article>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY },
    }

    const res = await fetch('https://nextmyblogs.microcms.io/api/v1/posts', key)
    const repos = await res.json()

    const paths = repos.contents.map((repo) => `/posts/${repo.id}`)
    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params.id

    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY },
    }

    const res = await fetch(
        `https://nextmyblogs.microcms.io/api/v1/posts/${id}`,
        key
    )
    const blog = await res.json()

    return {
        props: {
            postData: blog,
        },
    }
}
