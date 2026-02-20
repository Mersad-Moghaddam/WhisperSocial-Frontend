import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as authApi from '../api/auth'

const AuthContext = createContext(null)

// Decode JWT token to extract claims
function decodeToken(token) {
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const decoded = JSON.parse(atob(parts[1]))
    return {
      id: decoded.user_id,
      email: decoded.email,
      role: decoded.role || 'user',
      userId: decoded.user_id,
    }
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem('token')
    return storedToken ? decodeToken(storedToken) : null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function handleLogout() {
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
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
        // Prefer explicit user returned by the auth API when available
        if (data.user) {
          // Keep a copy of user object for quick checks in the client
          try {
            localStorage.setItem('user', JSON.stringify(data.user))
          } catch (e) {
            // ignore localStorage write errors
          }
          setUser({
            id: data.user.id || data.user.user_id || null,
            email: data.user.email || null,
            role: data.user.role || 'user',
            userId: data.user.id || data.user.user_id || null,
          })
        } else {
          // Fallback to decoding token claims
          const decodedUser = decodeToken(data.token)
          setUser(decodedUser)
        }
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
      // Auto-login after successful registration
      if (data && data.token) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        if (data.user) {
          try {
            localStorage.setItem('user', JSON.stringify(data.user))
          } catch (e) {
            // ignore localStorage write errors
          }
          setUser({
            id: data.user.id || data.user.user_id || null,
            email: data.user.email || null,
            role: data.user.role || 'user',
            userId: data.user.id || data.user.user_id || null,
          })
        } else {
          const decodedUser = decodeToken(data.token)
          setUser(decodedUser)
        }
      }
      return data
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
export default AuthContext
