import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { LOGO } from '../utils/Constant'
import { addGeminiMovies, gptToggleFun } from '../utils/gptSlice'
function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isToggle = useSelector((state)=>state.gpt.gptToggleButton)

  const name = useSelector((state) => state.user.name)

  function logoutHandler(){
    dispatch(removeUser())
    navigate("/")
  }

  function handleToggleChanges(){
    dispatch(addGeminiMovies({geminiMoviesName:null,geminiMovies:null}))
    dispatch(gptToggleFun())
  }
  function logoutHandlerInImag(){
    if(isToggle){
      dispatch(addGeminiMovies({geminiMoviesName:null,geminiMovies:null}))
      dispatch(gptToggleFun())
    }
  }

  

  return (
    <div className={`bg-black md:bg-transparent py-2 md:py-0 md:absolute md:top-1 md:z-20 ${isToggle ? "fixed" : ""}`}>
      <div className='w-[97.5vw] flex justify-between md:px-5 xl:px-[74px]'>
          <div>
            <img onClick={logoutHandlerInImag} className=' cursor-pointer w-[32vw] md:w-[24vw] lg:w-[20vw] xl:lg:w-[10vw]' src={LOGO} alt="logoi" />
          </div>
          {
            name &&<div className=' flex items-center gap-2 md:gap-5'>
              <button className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 
              font-medium rounded-lg text-sm md:text-base px-3 py-2 md:px-5 md:py-2.5 text-center md:me-2 md:mb-2' onClick={handleToggleChanges}>Gemini GPT</button>
            <img src="" alt="" />
            <h4 className=' hidden md:inline-block font-medium text-lg text-white'>Welcome, {name.split(" ")[0]}</h4>
            <button onClick={logoutHandler} className='bg-red-700 text-white font-medium rounded-lg text-sm md:text-base px-3 py-2'>Logout</button>
          </div>
          }
      </div>
    </div>
  )
}

export default Header