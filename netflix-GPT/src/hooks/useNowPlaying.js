import { useEffect } from "react"
import { options } from "../utils/NowPlaying"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { addMovies } from "../utils/movieSlice";


function useNowPlaying() {
    const NowPlayingMovies= useSelector((state)=>state.movie.movies)
    const dispatch = useDispatch()
    const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
    async function fetchNowPlayingMovies(){
        if(NowPlayingMovies){
          console.log("it's inside now playing movie")
          return; 
        }
        const response = await axios.get(url,options)
        dispatch(addMovies({movie:response.data.results}))
    }
  useEffect(()=>{
    fetchNowPlayingMovies()
  },[])
}

export default useNowPlaying