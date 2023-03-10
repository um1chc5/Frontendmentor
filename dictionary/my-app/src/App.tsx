import React, { useEffect, useRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import FetchAPI from './Components/FetchAPI/fetchAPI'

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
  const [audio, setAudio] = useState<string>('')
  const wordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event?.target.value)
  }

  const fetchData = async () => {
    let res = await FetchAPI(word)
    setData(res as dataTypes)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetchData()
  }

  const phoneticsHandle = (phonetics: any) => {
    const phonetic = phonetics.filter((element: any) => {
      if (element.audio !== '' && element.text) {
        return true
      }
    })
    return phonetic[0]
  }

  const audioElement = React.useRef<HTMLAudioElement>(null)
  const playHandler = () => {
    audioElement.current?.play()
  }
  useEffect(() => {
    setMeanings(data?.meanings)
    console.log(data)
  }, [data])

  useEffect(() => {}, [meanings])

  return (
    <div className='App'>
      <form onSubmit={handleSubmit} style={{ width: '38rem' }}>
        <input type='text' onChange={wordChange} value={word} />
      </form>
      <div>
        {meanings !== undefined && (
          <div>
            <h2>{data?.word.toUpperCase()}</h2>
            <p>
              <strong>Phonetic:</strong> {phoneticsHandle(data?.phonetics).text}
            </p>
            <button onClick={playHandler}>▶</button>
            <audio src={phoneticsHandle(data?.phonetics).audio} ref={audioElement}></audio>
          </div>
        )}
        {meanings !== undefined &&
          meanings.map((mean, index) => {
            return (
              <div key={index}>
                <h3 style={{ textAlign: 'left' }}>{mean.partOfSpeech}</h3>
                {mean.definitions.map((def: { definition: string; example: string }, _index: number) => {
                  return (
                    <ul>
                      <li style={{ textAlign: 'left' }} key={_index}>
                        {def.definition}
                      </li>
                      {def.example && (
                        <ul key={Math.random()}>
                          <li style={{ color: 'gray' }} key={Math.random()}>
                            {def.example}
                          </li>
                        </ul>
                      )}
                    </ul>
                  )
                })}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default App
