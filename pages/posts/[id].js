import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import fetch from 'isomorphic-unfetch';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={`${utilStyles.lightText} ${utilStyles.flex}`}>
          <Date dateString={postData.date}/>
          {postData.tags.map((tag) => (
            <p key={tag.id} className={utilStyles.tag} style={{marginLeft:10}}>
              <span>{tag.name}</span>
            </p>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.body }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }

  const res = await fetch('https://nextmyblogs.microcms.io/api/v1/posts', key)
  const repos = await res.json()

  const paths = repos.contents.map((repo) => `/posts/${repo.id}`)
      console.log(paths)
  return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
    console.log(context.params)
  const id = context.params.id

  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }

  const res = await fetch(`https://nextmyblogs.microcms.io/api/v1/posts/${id}`, key)
  const blog = await res.json()

  return {
    props: {
      postData: blog,
    },
  }
}