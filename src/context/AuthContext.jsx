import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as authApi from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function handleLogout() {
      localStorage.removeItem('token')
      setToken(null)
    }
    window.addEventListener('logout', handleLogout)
    return () => window.removeEventListener('logout', handleLogout)
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const data = await authApi.login(email, password)
      if (data && data.token) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      }
      return data
    } finally {
      setLoading(false)
    }
  }

  const register = async (email, password) => {
    setLoading(true)
    try {
      const data = await authApi.register(email, password)
      return data
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken, isAuthenticated: !!token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
export default AuthContext
