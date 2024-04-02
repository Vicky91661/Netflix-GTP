import { useEffect } from "react"
import { options } from "../utils/NowPlaying"
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addMovies } from "../utils/movieSlice";


function useNowPlaying() {
    const dispatch = useDispatch()
    const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
    async function fetchNowPlayingMovies(){
        const response = await axios.get(url,options)
        dispatch(addMovies({movie:response.data.results}))
    }
  useEffect(()=>{
    fetchNowPlayingMovies()
  },[])
}

export default useNowPlaying