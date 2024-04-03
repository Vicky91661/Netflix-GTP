import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies:null,
    trandingMovies:null,
    topRatedMovies:null,
    upcomingMovies:null
};
const movieSlice = createSlice({
    name:"movieSlice",
    initialState,
    reducers:{
        addMovies:(state,action)=>{
            state.movies=action.payload.movie
        },
        removeMovies:(state,action)=>{
            state.movies=null
        },
        addTrandingMovies:(state,action)=>{
            state.trandingMovies=action.payload.trandingMovies
        },
        addTopRatedMovies:(state,action)=>{
            state.topRatedMovies=action.payload.topRatedMovies
        },
        addUpcomingMovies:(state,action)=>{
            state.upcomingMovies=action.payload.upcomingMovies
        },
    }

})


export const {addMovies,removeMovies,addTrandingMovies,addTopRatedMovies,addUpcomingMovies} = movieSlice.actions;
export default movieSlice.reducer;
 