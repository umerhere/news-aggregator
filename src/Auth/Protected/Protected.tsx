import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const Protected = () => {
  const item = localStorage.getItem('token')
  const token = item
  console.log(token)  

  return (
    token ? <Outlet /> : <Navigate to="/" />
  )

}

export default Protected 