import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import fetch from 'isomorphic-unfetch'
import { GetStaticPaths, GetStaticProps } from 'next'

// PostData型を定義
type PostData = {
    title: string
    date: string
    body: string
    tags: { id: string; name: string }[]
    thumbnail: { url: string }
}

type PostProps = {
    postData: PostData
}

export default function Post({ postData }: PostProps) {
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

// getStaticPathsの型定義
export const getStaticPaths: GetStaticPaths = async () => {
    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY ?? '' }, // process.env.API_KEYがundefinedであれば空文字にする
    }

    const res = await fetch('https://nextmyblogs.microcms.io/api/v1/posts', key)
    const repos = await res.json()

    const paths = repos.contents.map((repo: { id: string }) => ({
        params: { id: repo.id },
    }))
    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
    const id = context.params?.id as string

    const apiKey = process.env.API_KEY
    if (!apiKey) {
        throw new Error('API_KEY is missing')
    }

    const key = {
        headers: { 'X-API-KEY': apiKey }, // process.env.API_KEYがundefinedでないことを保証
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