
import { useEffect } from "react"
import { options } from "../utils/NowPlaying"
import axios from "axios"
import { useDispatch,useSelector } from 'react-redux';
import { addUpcomingMovies } from "../utils/movieSlice";


function useUpcomingMovies() {
    const dispatch = useDispatch()
    const upcomingMovies= useSelector((state)=>state.movie.upcomingMovies)
    const url = 'https://api.themoviedb.org/3/movie/upcoming?page=1';
    async function fetchUpcomingMovies(){
        if(upcomingMovies) return
        const response = await axios.get(url,options)
        dispatch(addUpcomingMovies({upcomingMovies:response.data.results}))
    }
  useEffect(()=>{
    fetchUpcomingMovies()
  },[])
}

export default useUpcomingMovies;