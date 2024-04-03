import { useEffect } from "react"
import { options } from "../utils/NowPlaying"
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addTrandingMovies } from "../utils/movieSlice";


function useTrandingMovies() {
    const dispatch = useDispatch()
    const url = 'https://api.themoviedb.org/3/movie/popular?page=1';
    async function fetchTrandingMovies(){
        const response = await axios.get(url,options)
        dispatch(addTrandingMovies({trandingMovies:response.data.results}))
    }
  useEffect(()=>{
    fetchTrandingMovies()
  },[])
}

export default useTrandingMovies;