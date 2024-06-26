import { useEffect } from "react"
import { options } from "../utils/NowPlaying"
import axios from "axios"
import { useDispatch,useSelector } from 'react-redux';
import { addTrandingMovies } from "../utils/movieSlice";


function useTrandingMovies() {
    const dispatch = useDispatch()
    const trandingMovies= useSelector((state)=>state.movie.trandingMovies)
    const url = 'https://api.themoviedb.org/3/movie/popular?page=1';
    async function fetchTrandingMovies(){
        if(trandingMovies){
          return
        }
        const response = await axios.get(url,options)
        dispatch(addTrandingMovies({trandingMovies:response.data.results}))
    }
  useEffect(()=>{
    fetchTrandingMovies()
  },[])
}

export default useTrandingMovies;