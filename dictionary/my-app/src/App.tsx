import React, { Fragment, useEffect, useRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import FetchAPI from './Components/FetchAPI/fetchAPI'
import Meanings from './Components/meanings/Meanings'

interface dataTypes {
  meanings: Array<any>
  phonetics: Array<any>
  sourceUrls: Array<any>
  word: string
}

function App() {
  const [word, setWord] = useState<string>('')
  const [data, setData] = useState<dataTypes>()
  const [meanings, setMeanings] = useState<Array<any>>()
  const [errorState, setError] = useState<boolean>(false)
  const wordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event?.target.value)
  }

  console.log(errorState)

  const fetchData = async () => {
    let res = await FetchAPI(word)
    if (res) {
      setData(res as dataTypes)
    } else {
      setError(true)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetchData()
  }

  const phoneticsHandle = (phonetics: any) => {
    const phonetic = phonetics?.filter((element: any) => {
      if (element.audio !== '' && element.text) {
        return true
      }
    })

    if (phonetics) {
      return phonetic[0]
    }
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

  useEffect(() => {}, [meanings])

  return (
    <Fragment>
      <div className='flex flex-col place-items-center'>
        <h1 className='py-10 text-4xl font-bold text-cyan-600'>Dictionary</h1>
        <div className='max-w-2xl mb-16'>
          <form onSubmit={handleSubmit} style={{ width: '38rem' }} className='border-cyan-800'>
            <input
              type='text'
              onChange={wordChange}
              value={word}
              placeholder='Type your word here'
              className='w-full px-4 py-2 mb-6 !text-xl font-medium text-gray-500 border outline-none border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 focus:border-3'
            />
          </form>
          {errorState && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
              <p className='font-semibold'>Cannot find this word!</p>
              <span className='absolute top-0 bottom-0 right-0 px-4 py-3' onClick={resetSearch}>
                <svg
                  className='fill-current h-6 w-6 text-red-500'
                  role='button'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <title>Close</title>
                  <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
                </svg>
              </span>
            </div>
          )}
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
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default App
