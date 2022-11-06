import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
const FavoriteList = ({ favList,handleDeletePackage }) => {
    console.log("FavoriteList");
    const handleAlert = (val)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
             handleDeletePackage(val)
            } else {
              swal("Your package file is safe!");
            }
          });
    }
    return (
        <div className='mt-20'>
            <table className='border-collapse border border-slate-400' >
                <thead>
                    <tr >
                        <th className='border border-slate-300 w-[700px]'>Package Name</th>
                        <th className='border border-slate-300 w-[400px]'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {favList.map((item) => {
                        const {name,date} =item.package
                        return (
                            <tr key={date}>
                                <td className='border border-slate-300'>{name}</td>
                                <td className='border border-slate-300 pl-4'><FontAwesomeIcon icon={faTrash} onClick={()=>{handleAlert(date)}}/></td>
                            </tr>
                        )
                    })}

                </tbody>

            </table>
        </div>
    )
}

export default FavoriteList