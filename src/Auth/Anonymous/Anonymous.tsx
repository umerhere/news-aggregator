import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const Anonymous = () => {
  const item = localStorage.getItem('token')
  const token = item

  return token ? <Navigate to="/settings" replace /> : <Outlet />;
}

export default Anonymous 