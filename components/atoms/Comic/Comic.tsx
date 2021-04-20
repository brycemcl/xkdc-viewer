import 'normalize.css'
import styles from './styles.module.css'
import { formatDistance } from 'date-fns'
const component = ({
  year,
  day,
  month,
  num,
  alt,
  img,
  title,
  height,
  width,
}) => {
  return (
    <>
      <div className={styles.container} id={`comic${num}`}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <h2 className={styles.headings}>Number: #{num}</h2>
          <p className={styles.headings}>
            {formatDistance(new Date(year, month - 1, day), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
        <h3 className={`${styles.headings} ${styles.h2}`}>{title}</h3>
        <div
          style={{
            margin: 0,
            paddingTop: `${(height / width) * 100}%`,
            width: '100%',
            position: 'relative',
          }}>
          <img
            src={img}
            alt={alt}
            style={{
              height: `100%`,
              width: `100%`,
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            loading='lazy'
          />
        </div>
      </div>
    </>
  )
}

export default component
