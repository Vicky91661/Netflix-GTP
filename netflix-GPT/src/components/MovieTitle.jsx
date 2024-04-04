import React from 'react'

function MovieTitle({title,description}) {
  return (
    <div className=' absolute text-white w-[70vw]  md:w-[60vw] top-[19vh] left-[5vw] md:top-[17vh] lg:top-[18vh] xl:top-[40vh] xl:w-[30vw] xl:left-[5vw] md:left-[5vw]  flex flex-col gap-2 md:gap-5 z-20'>
        <h1 className=' text-base font-medium md:font-bold md:text-2xl lg:text-3xl xl:text-5xl'>{title}</h1>
        <h1 className='hidden md:flex xl:text-xl md:text-base md:font-normal '>{description}</h1>
        <div className='flex gap-4'>
          <button className='bg-white hover:bg-gray-200 text-black px-4 py-[2px] text-xs md:py-2 md:px-12 md:text-lg rounded-md'>Play</button>
          <button className='bg-black bg-opacity-80 hover:opacity-100 px-4 py-[2px] text-xs md:py-2 md:px-12 md:text-lg rounded-md'>More Info</button>
        </div> 
    </div>
  )
}

export default MovieTitle

// w-[30vw] top-[40vh] left-[5vw]