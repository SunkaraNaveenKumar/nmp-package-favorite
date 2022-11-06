import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TextInput from '../CommonComponents/TextInput'
import axios from 'axios'
import swal from 'sweetalert';
import PackageList from './PackageList'
import TextArea from '../CommonComponents/TextArea'
import ButtonComponent from '../CommonComponents/ButtonComponent'


const Home = () => {
  const [searchText, setSearchText] = useState("")
  const [packagesList, setPackagesList] = useState([])
  const [checkedPackage, setCheckedPackage] = useState("")
  const [description,setDescription]=useState("")
  const [error,setError]=useState("")
  const [isPending,setIsPending]=useState(true)
  const localStorageFavorite = JSON.parse(window?.localStorage.getItem("favorite")) || []
  const handleRadioButtons = useCallback((e) => {
    const { value } = e.target
    setCheckedPackage(value)
  },[checkedPackage])
  const handleDescription=useCallback((e)=>{
    const {value}=e.target 
    setDescription(value)
  },[description])

  useEffect(() => {
    setIsPending(true)
      axios.get(`https://api.npms.io/v2/search?q=reactjs`)
      .then((response) => {
        const { results: packagesData } = response?.data
          setPackagesList(packagesData)
        window.localStorage.setItem("packages", JSON.stringify(packagesData))
        setIsPending(false)
      }).catch((err) => {
        alert("error:", err.message)
      })
     
  }, [])

  const filteredSearchData =useMemo(()=>{
    const  data= packagesList.filter((item)=>{
      return (item.package.name).includes(searchText)
    })
    return data
  },[searchText,packagesList])
  const handleSearch = useCallback((e) => {
    const { value } = e.target
    setSearchText(value)
  },[searchText])

  const handleError=()=>{
    const toggle = localStorageFavorite.some((item) => {
      const { date } = item.package
      return date === checkedPackage
    })
    if(checkedPackage===""){
      return "please select the package to submit"
    }else if(description === ""){
     return "please Enter the text why is this package your fav?" 
    }
    else if(toggle){
     return "This Package is already added to favorites, please select the other package"
    }
    return ""
  }

  const handleFavorite = useCallback(() => {
    if(handleError()){
      setError(handleError())
    }else{
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
      }
     
  },[error,checkedPackage,searchText,description])
  return (
    <div className='ml-28 mr-28' >
      <TextInput handleSearch={handleSearch} searchText={searchText} />
      <PackageList isPending={isPending}
       filteredSearchData={filteredSearchData} 
       handleRadioButtons={handleRadioButtons} 
       checkedPackage={checkedPackage} />
      <div className='mt-10'>
        <p>Why is this your favorite ?</p>
        <TextArea handleDescription={handleDescription} description={description}/>
      </div>
      <div className='flex justify-end w-full'>
      {error && <p className='text-red-500 mr-48'>{error}</p>}
        <ButtonComponent type="submit" handleFavorite={handleFavorite} />
      </div>
    </div>
  )
}

export default Home