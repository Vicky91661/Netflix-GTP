import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const name = useSelector((state) => state.user.name)
  console.log(name)

  function logoutHandler(){
    dispatch(removeUser())
    navigate("/")
  }

  return (
    <div className=' absolute left-[5%] md:left-[18%] top-1 z-10 flex items-center gap-[40vw]'>
      <div>
        <img className=' w-[32vw] md:w-[24vw] lg:w-[20vw] xl:lg:w-[10vw]' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logoi" />
      </div>
      {
        name &&<div className=' flex items-center gap-5'>
        <img src="" alt="" />
        <h4 className='  font-medium text-lg'>Welcome, {name.split(" ")[0]}</h4>
        <button onClick={logoutHandler} className='bg-red-700 text-white font-semibold rounded-md py-3 px-6 text-lg'>Logout</button>
      </div>
      }
      
        
    </div>
  )
}

export default Header