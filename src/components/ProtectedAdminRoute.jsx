import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedAdminRoute({ children }) {
  const { user } = useAuth()

  // Check if user is authenticated and has admin role
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return children
}

ProtectedAdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
