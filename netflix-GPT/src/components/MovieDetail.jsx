import React, { useEffect, useState } from 'react'
import { IMG_URL, LOGO } from '../utils/Constant'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { options } from '../utils/NowPlaying';

function MovieDetail() {
    const naviagate = useNavigate();
    const [key, setKey] = useState(null)
    const [movieDetails,setMovieDetails] = useState(null)

    const {id}  =useParams()

    const handleImageClick=()=>{
        naviagate("/")
    }

    const fetchMovieDetail = async ()=>{
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`,options)
        console.log(response.data)
        const {title,overview,poster_path,vote_average,runtime}=response.data;
        setMovieDetails({
            title,
            overview,
            poster_path,
            rating:vote_average,
            runtime
        })
        console.log("movie details is ",title,overview,poster_path,vote_average,runtime)
    }
    
    const fetchTrailer = async ()=>{
        const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
        try {
            const response = await axios.get(url, options);
            const movieVideo= response.data.results
            const trailers = movieVideo.filter((data)=>data.type==="Trailer")
            const trailer = trailers.length ?trailers[0]:movieVideo[0]
            setKey(trailer.key);    
        } catch (error) {
            console.log("error inside the video section",error)
        }
        
    }

    useEffect(()=>{
        fetchMovieDetail()
        fetchTrailer()
    },[])

  return (
    <div>
         <div className=' fixed -z-10 bg-cover bg-center w-[100vw] h-[100vh] bg-[url("https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_medium.jpg")]'>
            <div className='-z-10 bg-black bg-opacity-50 w-[100vw] h-[100vh]'></div>
        </div>

        <div className='bg-black md:bg-transparent py-2 md:py-0 z-20'>
            <div className='w-[97.5vw] flex justify-between md:px-5 xl:px-[74px] cursor-pointer'>
                <div>
                    <img onClick={handleImageClick} className=' w-[32vw] md:w-[24vw] lg:w-[20vw] xl:lg:w-[10vw]' src={LOGO} alt="logoi" />
                </div>
            </div>
        </div>
        {
            movieDetails && 
            <div className='text-white flex w-[100vw]  h-[90vh] px-[5%] gap-7'>
                <div className='flex items-center justify-center w-1/2 bg-black bg-opacity-80 rounded-lg'>
                    <img className=' rounded-lg' src={IMG_URL+movieDetails.poster_path} alt="movies poster" />
                </div>
                <div className=' flex flex-col gap-8 w-1/2 bg-black bg-opacity-80 rounded-lg p-8'>
                    <div>
                        <h1 className='text-4xl'>{movieDetails.title}</h1>
                    </div>
                    <div>
                        <h4 className=' text-xl opacity-60'>{movieDetails.overview}</h4>
                    </div>
                    <div></div>
                </div>
                
            </div>
        }
        
       


    </div>
  )
}

export default MovieDetail