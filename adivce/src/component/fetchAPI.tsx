import React, { useEffect, useState } from 'react'
import styles from './fetchAPI.module.scss'
import './fetch.css'
import axios from 'axios'

export default function FetchAPI(props: { change: boolean }) {
  const { change } = props
  const [advice, setAdvice] = useState<string | null>(null)

  const fetchAPI = async () => {
    try {
      const data = await axios.get('https://api.adviceslip.com/advice')
      setAdvice(data.data.slip.advice)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAPI()
  }, [change])
  console.log('render')
  return <h3 className='quote'>{advice}</h3>
}
