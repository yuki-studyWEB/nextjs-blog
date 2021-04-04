// import fetch from 'node-fetch'

// // const postsDirectory = path.join(process.cwd(), 'posts')

// export const getSortedPostsData = async () => {
//   const key = {
//     headers: { 'X-API-KEY': process.env.API_KEY },
//   }
//   const res = await fetch(`https://nextmyblogs.microcms.io/api/v1/blogs`, key)
//   const data = await res.json()

//   return {
//     props: {
//       blogs: data.contents,
//     },
//   }
// }

// export const getStaticPaths = async () => {
//   const key = {
//     headers: { 'X-API-KEY': process.env.API_KEY },
//   }

//   const res = await fetch('https://nextmyblogs.microcms.io/api/v1/blogs', key)
//   const repos = await res.json()

//   const paths = repos.contents.map((repo) => `/blogs/${repo.id}`)
//       console.log(paths)
//   return { paths, fallback: false }
// }

// export const getStaticProps = async (context) => {
//     console.log(context.params)
//   const id = context.params.id

//   const key = {
//     headers: { 'X-API-KEY': process.env.API_KEY },
//   }

//   const res = await fetch(`https://nextmyblogs.microcms.io/api/v1/blogs/${id}`, key)
//   const blog = await res.json()

//   return {
//     props: {
//       blog: blog,
//     },
//   }
// }
