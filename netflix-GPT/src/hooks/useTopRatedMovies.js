
import { useEffect } from "react"
import { options } from "../utils/NowPlaying"
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addTopRatedMovies } from "../utils/movieSlice";


function useTopRatedMovies() {
    const dispatch = useDispatch()
    const url = 'https://api.themoviedb.org/3/movie/top_rated?page=1';
    async function fetchTopRatedMovies(){
        const response = await axios.get(url,options)
        dispatch(addTopRatedMovies({topRatedMovies:response.data.results}))
    }
  useEffect(()=>{
    fetchTopRatedMovies()
  },[])
}

export default useTopRatedMovies;
