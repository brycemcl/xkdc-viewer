import axios from 'axios'
import { promises as fs } from 'fs'
import * as fss from 'fs'
import { URL } from 'url'
import { default as sizeOf } from 'image-size'
const filePath = './public'
const fileName = `${filePath}/comics.json`
const workersPool = 5
const getAllComics = () => {
  console.log('Started getting comics')
  return new Promise(async (resolve) => {
    let waiting: boolean | number = true
    const getNewestComic = async () =>
      axios.get(`https://xkcd.com/info.0.json`).then(({ data }) => {
        return data
      })
    const getComic = (() => {
      let workers = 0
      return (num: number) => {
        if (typeof waiting === 'boolean') {
          waiting = 1
        } else {
          waiting++
        }
        const loop = setInterval(async () => {
          if (workers < workersPool) {
            clearInterval(loop)
            workers++
            const url = `https://xkcd.com/${num}/info.0.json`
            try {
              if (!comicsThatDontExist.includes(num)) {
                const data = await axios.get(url).then(({ data }) => data)
                const photo = await axios
                  .request({
                    method: 'GET',
                    responseType: 'arraybuffer',
                    url: data.img,
                  })
                  .then(({ data }) => data)
                data.img = new URL(data.img).pathname
                const { height, width } = sizeOf(photo)
                data.height = height
                data.width = width
                comics[num - 1] = data
                const photoName = filePath + data.img
                await fs.writeFile(photoName, photo)
                await fs.writeFile(fileName, JSON.stringify(comics))
              }
            } catch (error) {
              console.error('\n', 'error: ', num)
            } finally {
              workers--
              if (typeof waiting === 'number') {
                waiting--
              }
              if (!waiting) {
                resolve(true)
                console.log('Finished getting comics')
              }
            }
          }
        }, 5)
      }
    })()
    let oldComics = []
    try {
      oldComics = JSON.parse(await fs.readFile(fileName, 'utf-8'))
    } catch {}
    const newestComic = await getNewestComic()
    const comics = Array.apply(null, Array(newestComic.num)).map(
      (_, index) => index + 1,
    )

    if (!fss.existsSync(filePath + '/comics')) {
      fss.mkdirSync(filePath + '/comics')
    }
    const comicsThatDontExist = [404, 1608, 1663]
    comics.forEach((_, index) => {
      if (oldComics[index] && oldComics[index] !== index + 1) {
        comics[index] = oldComics[index]
      } else {
        getComic(index + 1)
      }
    })
  })
}

export default getAllComics
