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

function Browse() {
  useNowPlaying()
  useTrandingMovies()
  useTopRatedMovies()
  useUpcomingMovies()
  const isUser = useSelector((state) => state.user.name)
  console.log("inside the broswer user is",isUser)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!isUser){
      navigate("/")
    }
  },[isUser])

  return (
    <div>
      <Header/>
      <HeroSection/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse