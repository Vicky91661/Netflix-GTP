import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { options } from '../utils/NowPlaying';

function VideoSection({movieid}) {
    const [key, setKey] = useState(null)


    const fetchTrailer = async ()=>{
        const url = `https://api.themoviedb.org/3/movie/${movieid}/videos`;
        const response = await axios.get(url, options);
        const movieVideo= response.data.results
        const trailers = movieVideo.filter((data)=>data.type==="Trailer")
        const trailer = trailers.length ?trailers[0]:movieVideo[0]
        console.log("trailer of movie is ",trailer)
        setKey(trailer.key);    
    }

    useEffect(() => {
        fetchTrailer();
    }, []);

    return (
        <div>
             {key && <div className='w-[100vw] h-[100vh]'>
                <iframe 
                width="100%" 
                height="60%" 
                src={`https://www.youtube.com/embed/${key}?autoplay=1&loop=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen>

                </iframe>
            </div>}
        </div>
    )
        
       
}

export default VideoSection;
