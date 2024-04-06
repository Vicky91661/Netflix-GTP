import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUser } from '../utils/userSlice'


import Login from './Login'
import Browse from './Browse'
import MovieDetail from './MovieDetail'



function Body() {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initializeUser())
  },[])

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/browse' element={<Browse/>}></Route>
            <Route path="/movie/:id" element={<MovieDetail/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default Body