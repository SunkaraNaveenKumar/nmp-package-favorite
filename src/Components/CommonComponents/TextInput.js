import React, { memo } from 'react'

const TextInput = ({ searchText, handleSearch }) => {
  console.log("TextInput")
  return (
    <input className='border-2 border-solid border-black w-full' type="search" value={searchText} onChange={(e) => { handleSearch(e) }} placeholder="search packages ...."></input>
  )
}

export default memo(TextInput)