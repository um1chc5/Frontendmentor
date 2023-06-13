import React, { Fragment, useEffect, useRef, useState } from 'react'
import './App.css'
import FetchAPI from './api/fetchAPI'
import Meanings from './Components/meanings/Meanings'
import Error from './Components/error'
import { DataTypes, Meaning, Phonetic } from './types/data.type'

function App() {
  const [word, setWord] = useState<string>('')
  const [data, setData] = useState<DataTypes>()
  const [meanings, setMeanings] = useState<Meaning[]>()
  const [errorState, setError] = useState<boolean>(false)
  const wordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event?.target.value)
  }

  // console.log(errorState)

  const fetchData = async () => {
    let res = await FetchAPI(word)
    if (res) {
      setData(res as unknown as DataTypes)
    } else {
      setError(true)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetchData()
  }

  const phoneticsHandle = (phonetics: Phonetic[] | undefined) => {
    const phonetic = phonetics?.filter((element: any) => {
      return element.audio !== '' && element.text
    })

    if (phonetics && phonetic) return phonetic[0]
  }

  const audioElement = React.useRef<HTMLAudioElement>(null)
  const playHandler = () => {
    audioElement.current?.play()
  }
  const resetSearch = () => {
    setError(false)
    setWord('')
  }

  useEffect(() => {
    setMeanings(data?.meanings)
    console.log(data)
  }, [data])

  return (
    <Fragment>
      <div className='flex justify-center'>
        <div className='max-w-xl'>
          <h1 className='py-10 text-4xl font-bold text-cyan-600 text-center'>Dictionary</h1>
          <div className='mb-16'>
            <form onSubmit={handleSubmit} style={{ width: '38rem' }} className='border-cyan-800'>
              <input
                type='text'
                onChange={wordChange}
                value={word}
                placeholder='Type your word here'
                className='w-full px-4 py-2 mb-6 !text-xl font-medium text-gray-500 border outline-none border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 focus:border-3'
              />
            </form>
            {errorState && <Error resetSearch={resetSearch} />}
            {!errorState && (
              <div>
                {meanings !== undefined && (
                  <div>
                    <h2 className='text-2xl mb-1 font-bold text-cyan-600'>{data?.word.toUpperCase()}</h2>
                    <div className='flex'>
                      <button onClick={playHandler}>▶</button>
                      <p className='ml-2 font-medium text-neutral-500'>
                        Phonetic {phoneticsHandle(data?.phonetics)?.text}
                      </p>
                      <audio src={phoneticsHandle(data?.phonetics)?.audio} ref={audioElement}></audio>
                    </div>
                  </div>
                )}
                {meanings !== undefined && <hr className='my-2' />}
                <Meanings meanings={meanings} />
                {meanings !== undefined && (
                  <a className='text-gray-600 mt-4 block' href={data?.sourceUrls[0]}>
                    <strong className='text-cyan-700'>Source URL:</strong>
                    <span className='underline ml-2'>{data?.sourceUrls[0]}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App
