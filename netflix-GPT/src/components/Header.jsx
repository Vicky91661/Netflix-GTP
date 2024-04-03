import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { LOGO } from '../utils/Constant'
import { gptToggleFun } from '../utils/gptSlice'
function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const name = useSelector((state) => state.user.name)

  function logoutHandler(){
    dispatch(removeUser())
    navigate("/")
  }

  function handleToggleChanges(){
    dispatch(gptToggleFun())
  }

  

  return (
    <div className=' absolute left-[5%] md:left-[18%] top-1 z-20 flex items-center gap-[40vw]'>
      <div>
        <img className=' w-[32vw] md:w-[24vw] lg:w-[20vw] xl:lg:w-[10vw]' src={LOGO} alt="logoi" />
      </div>
      {
        name &&<div className=' flex items-center gap-5'>
          <button className='text-white' onClick={handleToggleChanges}>Gemini GPT</button>
        <img src="" alt="" />
        <h4 className='  font-medium text-lg text-white'>Welcome, {name.split(" ")[0]}</h4>
        <button onClick={logoutHandler} className='bg-red-700 text-white font-semibold rounded-md py-3 px-6 text-lg'>Logout</button>
      </div>
      }
      
        
    </div>
  )
}

export default Header