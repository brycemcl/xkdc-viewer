import 'normalize.css'
import styles from './styles.module.css'
import Comic from '../../atoms/Comic'

const component = ({ comics = [] }) => {
  const comicsChildren = comics
    .filter((comic) => typeof comic === 'object')
    .map((comic) => <Comic key={JSON.stringify(comic)} {...comic} />)
    .reverse()
  return <div className={styles.container}>{comicsChildren}</div>
}
export default component
