import 'normalize.css'
import styles from './styles.module.css'
import Comic from '../../atoms/Comic'

const component = ({ comics = [] }) => {
  const comicsChildren = comics.map((comic) => <Comic {...comic} />).reverse()
  return <div className={styles.container}>{comicsChildren}</div>
}
export default component
