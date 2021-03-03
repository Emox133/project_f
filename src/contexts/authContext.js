import React, {useState, useContext} from 'react'
import axios from 'axios'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false)

  const handleLogout = (history) => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization'];
    setAuth(false)
    history.push('/login')
  }

  const value = {
      auth,
      setAuth,
      handleLogout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}