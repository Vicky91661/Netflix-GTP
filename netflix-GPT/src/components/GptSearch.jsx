import axios from 'axios'
import React, { useRef, useState } from 'react'
import { options } from '../utils/NowPlaying'
import { useDispatch } from 'react-redux'
import { addGeminiMovies } from '../utils/gptSlice'


function GptSearch() {
    const dispatch = useDispatch()
    const inputData = useRef()

    const [loading,setLoading]=useState(false);


    async function getGiminiMovies(SearchString){
        try {
            const response = await axios.get("https://api.themoviedb.org/3/search/movie?query="+SearchString+"&include_adult=false&page=1",options)
            return response.data.results;
        } catch (error) {
            
        }     
    }

    async function handleGptSearch(){
        setLoading(true)
        const data = inputData.current.value;
        const prompt = "Act like movie recommendation system, Suggest movie of given prompt:"+data+
        ". Give me name of 5 movie with comma seperated. For example:phir hera pheri,Guddar,sanam teri kasam,Himmatwala,Pariwar"
        try {
            const userData = localStorage.getItem('user')
            const {token}=JSON.parse(userData)
    
            const response = await axios.post("https://netflix-backend-five.vercel.app/gpt/gptSearch",{prompt},{ 
                headers: {
                  token
                }})
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
            dispatch(addGeminiMovies({geminiMoviesName:GiminiMovies,geminiMovies:TMDB_Movies}))
        } catch (error) {
           
        } finally {
            setLoading(false); // Set loading to false when the request is completed
        }
    }

  return (
    <div>
       
        {loading && <div className=' absolute w-[100vw] h-[100vh] text-lg text-white'>
            <div className='bg-black bg-opacity-70 flex justify-center items-center h-[100vh]' role="status">
                <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>}
        
        <div className={`flex justify-center`}>
            <form action="" className='pt-[25%] md:pt-[15%] xl:pt-[8%]' onSubmit={(e)=>e.preventDefault()}>
                <input ref={inputData} className='w-[60vw] px-2 py-1 md:px-4 md:py-2 rounded-lg mr-2 bg-black bg-opacity-60 text-white outline-none border-[1px]  md:text-lg' type="text" placeholder='What you want to see today?'/>
                <button className='bg-red-700 px-2 py-1 md:px-4 md:py-2 text-white rounded-lg' onClick={handleGptSearch}>
                    <svg className="w-6 h-6  inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" cliprulefillrule="evenodd" />
                    </svg>Search
                </button>
            </form>
        </div>
       
    </div>
  )
}

export default GptSearch
