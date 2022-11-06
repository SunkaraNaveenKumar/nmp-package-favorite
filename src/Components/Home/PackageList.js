import React, { memo } from 'react'

const PackageList = ({ packagesList, handleRadioButtons, checkedPackage }) => {
    console.log("packageList")
    const listLength = packagesList.length
    if (listLength > 0) {
        return (
            <div className='flex flex-col gap-2 mt-10 h-56 overflow-y-auto '>
                {packagesList.map((item) => {
                    const { name, date } = item.package
                    return <p key={date}><input type="radio" name="package" value={date}
                        checked={checkedPackage === date}
                        onChange={(e) => { handleRadioButtons(e) }}></input>{name}</p>
                })}
            </div>
        )
    } else {
        return <p className='text-red-500 mt-10'>There is No Package with name you searched ,please search with the other name!</p>
    }

}
export default memo(PackageList)