export default function Meanings(props: any | undefined) {
  const { meanings } = props
  return (
    <div className=''>
      {meanings !== undefined &&
        meanings.map((mean: any, index: any) => {
          return (
            <div key={index}>
              <h3 className='text-xl font-semibold text-cyan-700 mt-4'>{mean.partOfSpeech}</h3>
              {mean.definitions.map((def: { definition: string; example: string }, _index: number) => {
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
