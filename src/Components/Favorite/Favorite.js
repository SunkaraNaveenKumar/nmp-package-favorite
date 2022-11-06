import React, { useState, useEffect } from 'react'
import ButtonComponent from '../CommonComponents/ButtonComponent'
import FavoriteList from './FavoriteList'
import FavoriteTitle from './FavoriteTitle'


const Favorite = () => {
  const [favList, setFavlist] = useState(JSON.parse(window?.localStorage.getItem("favorite")) || [])
  const favLength = favList.length
  useEffect(() => {
    window.localStorage.setItem("favorite", JSON.stringify(favList))
  }, [favList])

  const handleDeletePackage = (val) => {
    const filteredLocalStorageData = favList.filter((item) => {
      const { date } = item.package
      return date !== val
    })
    setFavlist(filteredLocalStorageData)
  }
  return (
    <div className='ml-28 mr-28'>
      <div className={favLength > 0 ? 'flex  flex-row justify-between mt-10' : 'mt-10'}>
        <FavoriteTitle />
        {favLength > 0 && <ButtonComponent type="addfav" />}
      </div>
      {favLength > 0 ? (
        <FavoriteList favList={favList} handleDeletePackage={handleDeletePackage} />
      ) : (
        <div className='border-2 border-solid border-grey-500 w-full h-96 mt-20 flex flex-col justify-center items-center '>
          <p className='text-center'>You dont have any favs yet.please Add</p>
          <ButtonComponent type="addfav" />
        </div>
      )}

    </div>
  )
}

export default Favorite