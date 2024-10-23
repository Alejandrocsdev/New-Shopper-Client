import { useLocation } from 'react-router-dom'

function useQuery() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  
  const queryObject = {}

  queryParams.forEach((value, key) => {
    queryObject[key] = value
  })

  return queryObject
}

export default useQuery