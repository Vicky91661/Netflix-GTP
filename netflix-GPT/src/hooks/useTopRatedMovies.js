import { useEffect } from "react"
import { options } from "../utils/NowPlaying"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { addTopRatedMovies } from "../utils/movieSlice";


function useTopRatedMovies() {
    const dispatch = useDispatch()
    const topRatedMovies= useSelector((state)=>state.movie.topRatedMovies)
    const url = 'https://api.themoviedb.org/3/movie/top_rated?page=1';
    async function fetchTopRatedMovies(){
      if(topRatedMovies){
   
        return; 
      }
      const response = await axios.get(url,options)
      dispatch(addTopRatedMovies({topRatedMovies:response.data.results}))
    }
  useEffect(()=>{
    fetchTopRatedMovies()
  },[])
}

export default useTopRatedMovies;
