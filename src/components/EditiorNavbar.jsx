import React from 'react'
import logo from "../images/logo3.png"
import { FiDownload } from "react-icons/fi";


const EditiorNavbar = () => {
  return (
    <>
      <div className="EditiorNavbar flex items-center justify-between md:px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <img className='w-[150px] cursor-pointer' src={logo} alt="" />
        </div>
        <p>File / <span className='text-[gray]'>My Projects</span></p>
        <i className='p-[8px] btn bg-black rounded-[5px] cursor-pointer text-[20px] mr-1'><FiDownload /></i>
      </div>
    </>
  )
}

export default EditiorNavbar