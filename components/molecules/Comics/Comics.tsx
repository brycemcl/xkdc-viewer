import 'normalize.css'
import styles from './styles.module.css'
import Comic from '../../atoms/Comic'
import { useRef, useEffect, useState } from 'react'

const component = ({ comics = [] }) => {
  const [, render] = useState({})
  const ref = useRef(null)
  useEffect(() => {
    render({})
  }, [])
  const comicsChildren = comics
    .slice(0, ref.current ? Infinity : 10)
    .map((comic, index) => <Comic key={comic.num} {...comic} index={index} />)
  return (
    <div ref={ref} className={styles.container}>
      {comicsChildren}
    </div>
  )
}
export default component
