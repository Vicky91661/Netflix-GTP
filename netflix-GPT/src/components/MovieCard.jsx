import React from 'react'
import { IMG_URL } from '../utils/Constant'
import { useNavigate } from 'react-router-dom';

function MovieCard({movieId,poster_path}) {
  if(!poster_path) return null;

  const navigate = useNavigate()
  const handleMovieCardClick = ()=>{
      navigate()
  }

  return (
    <div className=' min-w-24 md:min-w-48 cursor-pointer' onClick={handleMovieCardClick}>
        <div className=''>
            <img className='w-24 md:w-48 rounded-md' src={IMG_URL+poster_path} alt="movies poster" />
        </div>
        {/* <div className='bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center absolute  left-32 top-3 z-10'>
                <p>{rating.toFixed(1)}</p>
            </div> */}
    </div>
  )
}

export default MovieCard