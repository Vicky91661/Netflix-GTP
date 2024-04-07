import React, { useEffect } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useNowPlaying from '../hooks/useNowPlaying'
import HeroSection from './HeroSection'
import SecondaryContainer from './SecondaryContainer'
import useTrandingMovies from '../hooks/useTrandingMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import SearchPage from './SearchPage'

function Browse() {
  useNowPlaying()
  useTrandingMovies()
  useTopRatedMovies()
  useUpcomingMovies()
  const isUser = useSelector((state) => state.user.name)
  const istoggle = useSelector((state)=>state.gpt.gptToggleButton)

  const navigate = useNavigate()

  useEffect(()=>{
    if(!isUser){
      navigate("/")
    }
  },[isUser])

  return (
    <div>
      <Header/>
      {istoggle?<SearchPage/>:
      <>
        <HeroSection/>
        <SecondaryContainer/>
      </>}
      
    </div>
  )
}

export default Browse