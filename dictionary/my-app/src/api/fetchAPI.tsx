import axios from 'axios'

const FetchAPI = async (word: string) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const { meanings, phonetics, sourceUrls } = response.data[0]
    return { word, meanings, phonetics, sourceUrls }
  } catch (error) {
    return false
  }
}

export default FetchAPI
