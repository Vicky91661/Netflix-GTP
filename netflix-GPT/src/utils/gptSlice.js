import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gptSlice",
    initialState:{
        gptToggleButton:false,
        geminiMovies:null,
        geminiMoviesName:null
    },
    reducers:{
        gptToggleFun:(state)=>{
            state.gptToggleButton=!state.gptToggleButton;
        },
        addGeminiMovies:(state,action)=>{
            const {geminiMoviesName,geminiMovies}=action.payload;
            state.geminiMoviesName=geminiMoviesName;
            state.geminiMovies=geminiMovies
        }
    }

})


export const {gptToggleFun,addGeminiMovies} = gptSlice.actions
export default gptSlice.reducer;

