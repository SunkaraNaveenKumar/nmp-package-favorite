import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const ButtonComponent = ({ type, handleFavorite }) => {
  console.log("ButtonComponent")
  const navigate = useNavigate()
  const handleButton = () => {
    if (type === "submit") {
      handleFavorite()
    } else {
      navigate("/searchpackage")
    }
  }
  return <button className='bg-blue-500 border-1 border-black border-solid px-2 my-2 py-1' onClick={handleButton}>
    {type === "submit" ? "Submit" : "Add Fav"}
  </button>
}

export default memo(ButtonComponent)