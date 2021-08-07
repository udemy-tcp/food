import { useEffect, useState } from 'react'
import yelp from '../api/yelp'

export default () => {
  const [results, setResults] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const searchApi = async (searchTerm) => {
    try {
      setLoading(true)
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'New York City'
        }
      })
      setResults(response.data.businesses)
      setLoading(false)
    } catch (err) {
      setErrorMessage(err)
      setLoading(false)
    }
  }

  // BAD CODE
  // Call searchApi when component
  // is first rendered.
  // searchApi('pasta')

  // GOOD
  useEffect(() => {
    searchApi('pasta')
  }, [])

  return [searchApi, results, errorMessage, loading]
}
