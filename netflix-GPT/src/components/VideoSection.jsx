import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { options } from '../utils/NowPlaying';

function VideoSection({movieid}) {
    const [key, setKey] = useState(null)

    const fetchTrailer = async ()=>{
        const url = `https://api.themoviedb.org/3/movie/${movieid}/videos`;
        try {
            const response = await axios.get(url, options);
            const movieVideo= response.data.results
            const trailers = movieVideo.filter((data)=>data.type==="Trailer")
            const trailer = trailers.length ?trailers[0]:movieVideo[0]
            setKey(trailer.key);    
        } catch (error) {
        
        }
        
    }

    useEffect(() => {
        fetchTrailer();
    }, []);

    return (
        <div className='overflow-hidden relative bg-red-700'>
            <div className=' absolute w-[100vw] aspect-video bg-gradient-to-r from-black z-10'></div>
             {key && <div className='w-[100vw]'>
                <iframe 
                className='w-[100vw] aspect-video scale-150' 
                src={`https://www.youtube.com/embed/${key}?autoplay=1&loop=1&playlist=${key}&mute=1&controls=0`} 
                title="YouTube video player" 
                referrerPolicy="strict-origin-when-cross-origin" 
                >
                </iframe>
            </div>}
        </div>
    )
        
       
}

export default VideoSection;