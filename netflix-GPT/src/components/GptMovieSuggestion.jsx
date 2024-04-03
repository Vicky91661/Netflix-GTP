import React from 'react'
import { useSelector } from 'react-redux'
import ListMovies from './ListMovies';

function GptMovieSuggestion() {
  const {geminiMovies,geminiMoviesName} = useSelector((state)=>state.gpt)
  if(!geminiMovies){
    return null;
  }
  return (
    <div className='  text-white'>
        {geminiMoviesName.map((movie,index)=><ListMovies key={index} title={movie} movies={geminiMovies[index]}/>)}
    </div>
  )
}

export default GptMovieSuggestion