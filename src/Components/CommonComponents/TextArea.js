import React,{memo} from 'react'

const TextArea = ({description,handleDescription}) => {
  console.log("TextArea")
  return (
    <textarea  className='border-2 border-solid border-black w-full' rows="7" cols="50" value={description} onChange={(e)=>{handleDescription(e)}}></textarea>
  )
}

export default memo(TextArea)