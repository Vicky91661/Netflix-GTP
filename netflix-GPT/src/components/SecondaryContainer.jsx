import React from 'react'
import ListMovies from './ListMovies'
import { useSelector } from 'react-redux'

function SecondaryContainer() {
    const movies = useSelector((state)=>state.movie)
  return (
    <div className='bg-black text-white'>
        {movies?.movies && movies?.trandingMovies &&  movies?.topRatedMovies && movies?.upcomingMovies &&
        <div className='-mt-12 md:-mt-10 lg:-mt-16 xl:-mt-60 2xl:-mt-80 relative z-40'>
            <ListMovies title="Now Playing" movies={movies?.movies}/>
            <ListMovies title="Upcoming Movies" movies={movies?.upcomingMovies}/>
            <ListMovies title="Tranding" movies={movies?.trandingMovies}/>
            <ListMovies title="Top Rated Movies" movies={movies?.topRatedMovies}/>
        </div>
        }
        
    </div>
  )
}

export default SecondaryContainer