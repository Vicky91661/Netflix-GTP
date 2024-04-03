import React from 'react'
import GptSearch from './GptSearch'
import GptMovieSuggestion from './GptMovieSuggestion'

function SearchPage() {
  return (
    <div >
        <div className=' fixed -z-10 bg-cover bg-center w-[100vw] h-[100vh] bg-[url("https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_medium.jpg")]'>
            <div className='-z-10 bg-black bg-opacity-50 w-[100vw] h-[100vh]'></div>
        </div>
        <GptSearch/>
        <GptMovieSuggestion/>
    </div>
  )
}

export default SearchPage