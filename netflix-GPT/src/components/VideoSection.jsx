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
            console.log("error inside the video section",error)
        }
        
    }

    useEffect(() => {
        fetchTrailer();
    }, []);

    return (
        <div className='overflow-hidden relative'>
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


// {
//     "genres": [
//       {
//         "id": 28,
//         "name": "Action"
//       },
//       {
//         "id": 12,
//         "name": "Adventure"
//       },
//       {
//         "id": 16,
//         "name": "Animation"
//       },
//       {
//         "id": 35,
//         "name": "Comedy"
//       },
//       {
//         "id": 80,
//         "name": "Crime"
//       },
//       {
//         "id": 99,
//         "name": "Documentary"
//       },
//       {
//         "id": 18,
//         "name": "Drama"
//       },
//       {
//         "id": 10751,
//         "name": "Family"
//       },
//       {
//         "id": 14,
//         "name": "Fantasy"
//       },
//       {
//         "id": 36,
//         "name": "History"
//       },
//       {
//         "id": 27,
//         "name": "Horror"
//       },
//       {
//         "id": 10402,
//         "name": "Music"
//       },
//       {
//         "id": 9648,
//         "name": "Mystery"
//       },
//       {
//         "id": 10749,
//         "name": "Romance"
//       },
//       {
//         "id": 878,
//         "name": "Science Fiction"
//       },
//       {
//         "id": 10770,
//         "name": "TV Movie"
//       },
//       {
//         "id": 53,
//         "name": "Thriller"
//       },
//       {
//         "id": 10752,
//         "name": "War"
//       },
//       {
//         "id": 37,
//         "name": "Western"
//       }
//     ]
//   }