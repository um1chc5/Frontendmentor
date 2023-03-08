import React, { useState } from 'react'
import styles from './app.module.scss'
import images from './images'
import FetchAPI from './component/fetchAPI'

function App() {
  const [change, setChange] = useState<boolean>(false)
  const changeAdvice = () => {
    setChange((prev) => !prev)
  }
  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <h4 className={styles.name}>ADVICE #117</h4>
        <FetchAPI change={change} />
        <img src={images.pt_desktop} alt='' className={styles.divider} />
        <div className={styles.dice} onClick={changeAdvice}>
          <img src={images.dice} alt='' style={{ display: 'block' }} />
        </div>
      </div>
    </div>
  )
}

export default App
