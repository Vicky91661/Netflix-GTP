import React from 'react'

function MovieTitle({title,description}) {
  return (
    <div>
        <h1>{title}</h1>
        <h1>{description}</h1>
    </div>
  )
}

export default MovieTitle