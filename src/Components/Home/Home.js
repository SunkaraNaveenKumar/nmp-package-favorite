import React, { useCallback, useRef, useState } from 'react'
import TextInput from '../CommonComponents/TextInput'
import axios from 'axios'
import swal from 'sweetalert';
import PackageList from './PackageList'
import TextArea from '../CommonComponents/TextArea'
import ButtonComponent from '../CommonComponents/ButtonComponent'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState("")
  const [packagesList, setPackagesList] = useState([])
  const [checkedPackage, setCheckedPackage] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [isPending, setIsPending] = useState(false)
  const localStorageFavorite = JSON.parse(window?.localStorage.getItem("favorite")) || []
  const timeout = useRef()                                 // debouncing
  const handleRadioButtons = useCallback((e) => {
    const { value } = e.target
    setCheckedPackage(value)
  }, [checkedPackage])

  const handleDescription = useCallback((e) => {
    const { value } = e.target
    setDescription(value)
  }, [description])

  const handleSearch = useCallback((e) => {
    clearTimeout(timeout.current)
    const { value } = e.target
    setSearchText(value)
    setIsPending(true)
    timeout.current=setTimeout(()=>{
      axios.get(`https://api.npms.io/v2/search?q=${value}`)
      .then((response) => {
        const { results: packagesData } = response?.data
        setPackagesList(packagesData)
        window.localStorage.setItem("packages", JSON.stringify(packagesData))
        setIsPending(false)
      }).catch((err) => {
        console.log("error:", err.message)
        setIsPending(false)
      })
    },500)
  },[searchText])

  const handleError = () => {
    const toggle = localStorageFavorite.some((item) => {
      const { date } = item.package
      return date === checkedPackage
    })
    if (checkedPackage === "") {
      return "please select the package to submit"
    } else if (description === "") {
      return "please Enter the text why is this package your fav?"
    }
    else if (toggle) {
      return "This Package is already added to favorites, please select the other package"
    }
    return ""
  }

  const handleFavorite = useCallback(() => {
    if (handleError()) {
      setError(handleError())
    } else {
      const filteredFavoriteData = packagesList.find((item) => {
        const { date } = item.package
        return date === checkedPackage
      })
      window.localStorage.setItem("favorite", JSON.stringify([...localStorageFavorite, filteredFavoriteData]))
      setCheckedPackage("")
      setSearchText("")
      setError("")
      setDescription("")
      swal("successfully Package added to the favorites");
      navigate("/")
    }

  }, [error, checkedPackage, searchText, description])
  return (
    <div className='ml-28 mr-28' >
      <TextInput handleSearch={handleSearch} searchText={searchText} />
      {isPending ? (
        <p className='text-red-500 mt-10'>...loading ...loading</p>
      ) : (
        searchText === "" ? (
          <p className='text-blue-500 mt-10'>Start Typing in the Input field to search the package...</p>
        ) : (
          <PackageList isPending={isPending}
            packagesList={packagesList}
            handleRadioButtons={handleRadioButtons}
            checkedPackage={checkedPackage} />
        )

      )}

      <div className='mt-10'>
        <p>Why is this your favorite ?</p>
        <TextArea handleDescription={handleDescription} description={description} />
      </div>
      <div className='flex justify-end w-full'>
        {error && <p className='text-red-500 mr-48'>{error}</p>}
        <ButtonComponent type="submit" handleFavorite={handleFavorite} />
      </div>
    </div>
  )
}

export default Home