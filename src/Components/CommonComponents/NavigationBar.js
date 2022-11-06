import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from '../Home'
const NavigationBar = () => {
  return (
    <>
    <Link to="/">Home</Link> |
    <Link to="/favorite">Favorite</Link>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
    </Routes>
    </>
  )
}

export default NavigationBar