import axios from 'axios'
import React, { useRef } from 'react'
import { options } from '../utils/NowPlaying'
import { useDispatch } from 'react-redux'
import { addGeminiMovies } from '../utils/gptSlice'


function GptSearch() {
    const dispatch = useDispatch()
    const inputData = useRef()


    async function getGiminiMovies(SearchString){
        try {
            const response = await axios.get("https://api.themoviedb.org/3/search/movie?query="+SearchString+"&include_adult=false&page=1",options)
            return response.data.results;
        } catch (error) {
            console.log("error while fetching movies in gimini movies",error)
        }     
    }

    async function handleGptSearch(){
        const data = inputData.current.value;
        const prompt = "Act like movie recommendation system, Suggest movie of given prompt:"+data+
        ". Give me name of 5 movie with comma seperated. For example:phir hera pheri,Guddar,sanam teri kasam,Himmatwala,Pariwar"
        try {
            const response = await axios.post("http://localhost:3000/gptSearch",{prompt})
            const GiminiMovies = response.data.message.split(",")
            const movies_Promise=GiminiMovies.map((movie)=>{
                if(movie[0]==" "){
                    movie=movie.replace(" ","")
                }
                movie=movie.replace("1. ","");
                movie=movie.replace("2. ","");
                movie=movie.replace("3. ","");
                movie=movie.replace("4. ","");
                movie=movie.replace("5. ","");
                return getGiminiMovies(movie);
            })
            const TMDB_Movies =await Promise.all(movies_Promise)
            console.log("TMDB Movies =>",TMDB_Movies)
            dispatch(addGeminiMovies({geminiMoviesName:GiminiMovies,geminiMovies:TMDB_Movies}))
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <div className={`flex justify-center`}>
            <form action="" className='pt-[10%]' onSubmit={(e)=>e.preventDefault()}>
                <input ref={inputData} className='w-[60vw] px-4 py-2 rounded-lg mr-2 bg-black bg-opacity-60 text-white outline-none border-[1px]  text-lg' type="text" placeholder='What you want to see today?'/>
                <button className='bg-red-700 px-4 py-2 text-white rounded-lg' onClick={handleGptSearch}>
                    <svg className="w-6 h-6  inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" cliprulefillrule="evenodd" />
                    </svg>Search
                </button>
                <div>
                    
                </div>
            </form>
        </div>
        <div>

        </div>
    </div>
  )
}

export default GptSearch

// GET url 'https://api.themoviedb.org/3/movie/{movie_id}?api_key=e2edc5f4a814b98e53d38e7e9edba8c5'