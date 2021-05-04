import Head from 'next/head'
import { promises as fs } from 'fs'
import Comics from '../components/molecules/Comics'
import getAllComics from '../src/getAllComics'
export async function getStaticProps(context) {
  await getAllComics()
  const comicsArrayOfStrings = JSON.parse(
    await fs.readFile(process.cwd() + '/public/comics.json', 'utf-8'),
  )
    .filter((comic) => typeof comic === 'object')
    .map((comic) => JSON.stringify(comic))
    .reverse()
  // deduplicate comics from api
  const comics = [...new Set(comicsArrayOfStrings)].map((comic: string) => {
    return { ...JSON.parse(comic), key: comic }
  })
  comics
    .filter((comic) => comic.img.includes('%3F%3F%3F.png'))
    .forEach((comic) => (comic.img = '/comics/white.png'))
  return {
    props: { comics },
  }
}
const page = ({ comics }) => {
  return (
    <>
      <Head>
        <title>xkcd</title>
        <link rel='icon' href='/favicon.ico' />
        <meta charSet='UTF-8' />
        <meta
          name='description'
          content='An infinite scroll xkcd comics viewer'
        />
        <meta name='keywords' content='xkcd, comics' />
        <meta name='author' content='Bryce McLachlan' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='manifest' href='manifest.json'></link>
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <div style={{ width: 'min(95vw, var(--image))' }}>
          <a href='https://xkcd.com/'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <img
                style={{ alignSelf: 'center' }}
                src={'/xkcd.png'}
                alt={'Original xkcd'}
                height={83}
                width={185}
              />
              <h1 style={{ alignSelf: 'flex-end', margin: 0 }}>
                An infinite scroll xkcd comics viewer
              </h1>
            </div>
          </a>
          <Comics comics={comics} />
        </div>
      </div>
    </>
  )
}
export default page
