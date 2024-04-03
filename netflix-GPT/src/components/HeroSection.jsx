import React from 'react'
import VideoSection from './VideoSection'
import MovieTitle from './MovieTitle'
import { useSelector } from 'react-redux'

function HeroSection() {
    const movies = useSelector((state) => state.movie?.movies)
    if(!movies) return;
   
    const mainMovie = movies[0];
    const {original_title,overview} =mainMovie
    const movieid = mainMovie.id;

  return (
    <div>
        <MovieTitle title={original_title} description = {overview}/>
        <VideoSection movieid={movieid}/>
        
    </div>
  )
}

export default HeroSection