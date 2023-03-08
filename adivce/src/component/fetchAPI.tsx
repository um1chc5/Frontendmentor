import React, { useEffect, useState } from 'react'
import styles from './fetchAPI.module.scss'
import './fetch.css'
import axios from 'axios'
import { CSSTransition } from 'react-transition-group'

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
  return (
    <CSSTransition in={true} timeout={1000} className='quote'>
      <h3 className='quote'>{advice}</h3>
    </CSSTransition>
  )
}
