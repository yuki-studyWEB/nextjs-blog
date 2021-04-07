import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import fetch from 'isomorphic-unfetch';
import Image from 'next/image'

export const getStaticProps: GetStaticProps = async() => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }
  const res = await fetch(`https://nextmyblogs.microcms.io/api/v1/posts`, key)
  const data = await res.json()
  return {
    props: {
      allPostsData: data.contents,
    },
  }
}

type Props = {
  allPostsData: {
    id: string
    title: string
    body?: string
    date: string
    tags: string[]
    thumbnail: {url:string}
  }[]
}

export default function Home({ allPostsData }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.underline}`}>
        <h2 className={utilStyles.headingLg}>About</h2>
        <div className={utilStyles.aboutMe}>
            <Image
              priority
              src="/images/profile.jpg?2"
              className={utilStyles.borderCircle}
              height={170}
              width={170}
            />
          <ul>
            <li>石谷　悠貴（いしや　ゆうき）</li>
            <li>神奈川県川崎市在住　現在27歳</li>
            <li>2019年からWeb業界に参入　Webコーダー歴約2年</li>
            <li>2021年よりフロントエンドエンジニアの道を本格的に目指す</li>
            <li className={utilStyles.mt8}>・習得スキル：HTML/CSS(SCSS)/JavaScript(React)</li>
            <li>・勉強中スキル：TypeScript/Next.js等</li>
          </ul>
        </div>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Works</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, thumbnail }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a><img className={utilStyles.thumbnail} src={thumbnail.url} alt=""/>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}