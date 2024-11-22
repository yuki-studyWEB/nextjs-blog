import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import fetch from 'isomorphic-unfetch'
import Image from 'next/image'
import { useEffect } from 'react'

export const getStaticProps: GetStaticProps = async () => {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        throw new Error('API_KEY is not defined');
    }

    const res = await fetch(`https://nextmyblogs.microcms.io/api/v1/posts`, {
        headers: {
            'X-API-KEY': apiKey,  // apiKeyはstring型であることが保証される
        },
    });

    const data = await res.json();
    return {
        props: {
            allPostsData: data.contents,
        },
    };
};
type Props = {
    allPostsData: {
        id: string
        title: string
        body?: string
        date: string
        tags: any[]
        thumbnail: { url: string }
    }[]
}

export default function Home({ allPostsData }: Props) {
    const careerData = allPostsData.filter(
        (data) => data.tags[0]!.id === 'rcnu3aeiypa'
    )
    const worksData = allPostsData.filter(
        (data) => data.tags[0]!.id !== 'rcnu3aeiypa'
    )
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section
                id="about"
                className={`${utilStyles.headingMd} ${utilStyles.underline} ${utilStyles.aboutArea}`}
            >
                <h2 className={utilStyles.headingLg}>About</h2>
                <div className={utilStyles.aboutMe}>
                <Image
                    priority
                    src="/images/profile_2.JPG"
                    className={utilStyles.borderCircle}
                    height={155}
                    width={165}
                    alt="プロフィール画像" // alt属性を追加
                />
                    <ul className={utilStyles.ml7}>
                        <li>石谷　悠貴（いしや　ゆうき）</li>
                        <li>神奈川県川崎市在住　30代</li>
                        <li>2019年からWeb業界に参入　Webコーダー歴約2年</li>
                        <li>
                            2021年からフロントエンドエンジニアとしてWebサービス開発の業務に携わる
                        </li>
                    </ul>
                </div>
                <div className={utilStyles.myProfile}>
                    はじめまして、石谷悠貴と申します。ユーザーエクスペリエンスを重視し、視覚的なデザインと機能性を両立したインターフェースを作成することを心がけてます。<br/>
                    <strong>HTML/CSS:</strong> レスポンシブデザインを考慮したCSSの知識があります。<br/>
                    <strong>JavaScript:</strong> Vue.js(2系,3系)を使った開発経験があります。<br/>また業務での経験はありませんが、Reactは公式ドキュメントやオンラインコースを通して学習を進めています。<br/>
                    <strong>UI/UX:</strong> ユーザー視点でのデザインに配慮し、直感的なインターフェースの作成を心がけています。<br/>
                    <strong>バックエンド連携:</strong> REST APIを通じたバックエンドとの連携をスムーズに行い、データ処理や非同期処理にも対応可能です。
                </div>
                <ul className={utilStyles.jumpButtonList}>
                    <li className={utilStyles.jumpButtonItem}>
                        <a href="#career">キャリア</a>
                    </li>
                    <li className={utilStyles.jumpButtonItem}>
                        <a href="#works">個人開発(勉強)</a>
                    </li>
                    <li className={utilStyles.jumpButtonItem}>
                        <a href="#contact">お問合せ</a>
                    </li>
                </ul>
            </section>
            <section
                id="career"
                className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.underline}`}
            >
                <h2 className={utilStyles.headingLg}>キャリア</h2>
                <ul className={utilStyles.list}>
                    {careerData.map(({ id, date, title, thumbnail }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                <a>
                                    <img
                                        className={utilStyles.thumbnail}
                                        src={thumbnail.url}
                                        alt=""
                                    />
                                    {title}
                                </a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
            <section
                id="works"
                className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.underline}`}
            >
                <h2 className={utilStyles.headingLg}>個人開発(勉強)</h2>
                <ul className={utilStyles.list}>
                    {worksData.map(({ id, date, title, thumbnail }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                <a>
                                    <img
                                        className={utilStyles.thumbnail}
                                        src={thumbnail.url}
                                        alt=""
                                    />
                                    {title}
                                </a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
            <section id="contact" className={utilStyles.mt24}>
                <h2 className={utilStyles.headingLg}>お問合せ</h2>
                <Link href="./contact" as={`/contact`}>
                    <a>お問い合わせ</a>
                </Link>
            </section>
        </Layout>
    )
}
