import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies:null
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
        }
    }

})


export const {addMovies,removeMovies} = movieSlice.actions;
export default movieSlice.reducer;
 