import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Favorite from '../Favorite/Favorite'
import Home from '../Home/Home'
const NavigationBar = () => {
  return (
    <>
      <div className='flex flex-row justify-end bg-pink-500 p-5 mb-5'>
        <div className='ml-5 bg-blue-300 rounded'>
          <Link to="/">Home</Link>
        </div>
        <div className='ml-5 bg-blue-300 rounded'>
          <Link to="/searchpackage">Add package</Link>
        </div>
      </div>

      <Routes>
        <Route path='/' element={<Favorite />}></Route>
        <Route path='/searchpackage' element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default NavigationBar