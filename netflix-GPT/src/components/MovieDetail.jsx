import React, { useEffect, useState } from 'react'
import { IMG_URL, LOGO } from '../utils/Constant'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { options } from '../utils/NowPlaying';
import VideoSection from './VideoSection';

function MovieDetail() {
    const naviagate = useNavigate();
    const [key, setKey] = useState(null)
    const [movieDetails,setMovieDetails] = useState(null)
    const [isTrailer,setIsTrailer]= useState(false)
    const {id}  =useParams()

    const handleImageClick=()=>{
        naviagate("/")
    }

    const fetchMovieDetail = async ()=>{
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`,options)
        console.log(response.data)
        const {title,overview,poster_path,vote_average,runtime}=response.data;
        let hour = Math.floor(runtime/60)
        let min = runtime%60
        let new_runtime=""
        if(hour)
            new_runtime = hour +" Hour "+min + " Min"
        else
            new_runtime= min+" Min"

        setMovieDetails({
            title,
            overview,
            poster_path,
            rating:vote_average,
            runtime:new_runtime
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
    const PlayTrailer = ()=>{
        setIsTrailer(!isTrailer)
    }

    useEffect(()=>{
        fetchMovieDetail()
        fetchTrailer()
    },[])

  return (
    <div className=' overflow-hidden'>
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
            <div className='text-white flex w-[100vw] md:h-[90vh]  md:gap-7 '>
                {isTrailer && key && 
                <div className=' absolute w-[90vw] z-20'>
                            <button className=' absolute -right-5 top-2  md:-right-8 xl:-right-24 md:top-8 z-30 text-lg md:text-2xl bg-white rounded-full w-12 h-12  md:w-16 md:h-16 text-balance' onClick={()=>setIsTrailer(false)}>❌</button>
                            <iframe 
                            className='w-[100vw] aspect-video scale-90 bg-red-900' 
                            src={`https://www.youtube.com/embed/${key}?autoplay=1&loop=1&playlist=${key}&controls=0`} 
                            title="YouTube video player" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            >
                            </iframe>
                </div>}
                <div className='flex flex-col md:flex-row mr-10 mt-5 mb-5 md:mt-0 md:mb-0 items-center gap-3 md:gap-7'>
                    <div className='flex items-center justify-center md:w-1/2 shadow-2xl rounded-lg'>
                        <img className=' object-cover object-center rounded-lg' src={IMG_URL+movieDetails.poster_path} alt="movies poster" />
                    </div>
                    <div className=' flex flex-col gap-4 min-h-[50vh] md:min-h-[45vh] lg:min-h-[50vh] xl:h-[82vh] md:gap-5 lg:gap-8 md:w-1/2 bg-black bg-opacity-80 rounded-lg p-8'>
                        <div>
                            <h1 className=' text-2xl md:text-3xl lg:text-5xl uppercase tracking-widest font-medium'>{movieDetails.title}</h1>
                        </div>
                        <div>
                            <h4 className=' text-lg md:text-2xl lg:text-3xl opacity-60 tracking-wide'>{movieDetails.overview}</h4>
                        </div>
                        <div>
                            <h4 className=' text-lg md:text-2xl lg:text-3xl'>Movie Run Time : {movieDetails.runtime}</h4>
                        </div>
                        <div className='flex gap-5'>
                            <div className='bg-red-700 text-white rounded-full text-lg md:text-2xl font-medium w-12 h-12  md:w-16 md:h-16 flex items-center justify-center'>
                                <p>{movieDetails.rating.toFixed(1)}</p>
                            </div>
                            <div className='bg-black text-white rounded-full text-lg md:text-2xl font-medium w-12 h-12  md:w-16 md:h-16 flex items-center justify-center'>
                                <img className=' object-cover object-center cursor-pointer' onClick={PlayTrailer} src="https://wallpapers.com/images/hd/netflix-play-button-icon-qyeb48lbpvkxkcdt.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div> 
                
            </div>
        }
        
       


    </div>
  )
}

export default MovieDetail