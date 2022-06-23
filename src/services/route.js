/* eslint-disable react/prop-types */
import React from 'react'
import { Redirect } from 'react-router-dom'

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('idToken')
  return token === undefined || token === '' || token === 'undefined' || token === null ? (
    <Redirect to="/login" />
  ) : (
    children
  )
}
