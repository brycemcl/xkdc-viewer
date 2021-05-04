import 'normalize.css'
import styles from './styles.module.css'
import Comic from '../../atoms/Comic'
import { useEffect, useState } from 'react'
//https://github.com/microsoft/TypeScript/issues/21309
type RequestIdleCallbackHandle = any
type RequestIdleCallbackOptions = {
  timeout: number
}
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean
  timeRemaining: () => number
}

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void
  }
}

const component = ({ comics = [] }) => {
  const [fullList, setFullList] = useState(false)
  useEffect(() => {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => setFullList(true))
    } else {
      setTimeout(() => setFullList(true), 0)
    }
  }, [])
  const comicsChildren = comics
    .slice(0, fullList ? Infinity : 10)
    .map((comic, index) => <Comic {...comic} index={index} />)
  return <div className={styles.container}>{comicsChildren}</div>
}
export default component
