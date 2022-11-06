import React, { memo } from 'react'

const FavoriteTitle = () => {
  console.log("FavoriteTitle")
  return (
    <p className='font-medium'>Welcome to Favorite NPM Packages</p>
  )
}

export default memo(FavoriteTitle)