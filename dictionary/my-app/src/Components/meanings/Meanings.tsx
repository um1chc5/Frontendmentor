import { Definition, Meaning } from '../../types/data.type'

interface MeaningsProps {
  meanings: Meaning[] | undefined
}

// Phải khai báo kiểu giữ liệu lại cho props. Bởi vì meanings lấy được từ props chứa nhiều meanings khác nhau

export default function Meanings(props: MeaningsProps) {
  const { meanings } = props
  return (
    <div className=''>
      {meanings !== undefined &&
        meanings.map((mean: Meaning, index: any) => {
          return (
            <div key={index}>
              <h3 className='text-xl font-semibold text-cyan-700 mt-4'>{mean.partOfSpeech}</h3>
              {mean.definitions.map((def: Definition, _index: number) => {
                return (
                  <ul className='list-disc list-inside marker:text-cyan-800' key={Math.random()}>
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
  )
}
