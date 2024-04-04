import React from 'react'
import MovieCard from './MovieCard'

function ListMovies({title,movies}) {
  console.log("inside the movie list component",movies)
  return (
    <div className='py-1 pl-3 gap-1 md:py-3 md:pl-12 flex flex-col md:gap-3'>
      <h1 className='md:text-2xl'>{title}</h1>
      <div className='flex gap-2 md:gap-4 overflow-x-scroll scrollbar-thin  scrollbar-thumb-red-700 scrollbar-corner-transparentscrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-cursor-pointer'>
        {movies.map((movie)=>{
          return (<MovieCard key={movie.id} movieId={movie.id} poster_path={movie.poster_path}/>)
        })}
      </div> 
      
      
    </div>
  )
}

export default ListMovies;

//  <MovieCard rating={movie.vote_average} poster_path={movie.poster_path}/>