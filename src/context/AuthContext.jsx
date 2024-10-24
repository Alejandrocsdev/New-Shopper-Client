import { createContext, useContext, useState, useEffect } from 'react'
import { getAuthUser } from '../api/request/user'

const AuthContext = createContext({})

// (1) Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ accessToken: null, user: null })

  useEffect(() => {
    const signInCheck = async () => {
      try {
        const response = await getAuthUser(auth.accessToken)
        setAuth((prevState) => ({ ...prevState, user: response.user }))
        console.log('Response Message: ', response.message)
        console.log('User: ', response.user)
      } catch (error) {
        console.log(error.message)
        setAuth((prevState) => ({ ...prevState, user: null }))
      }
    }

    signInCheck()
  }, [auth.accessToken])

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

// (2) Hook
export const useAuth = () => useContext(AuthContext)
