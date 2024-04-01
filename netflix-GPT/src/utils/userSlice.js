import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email:null,
    token: null
  };
const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.name = action.payload.name
            state.email = action.payload.email
            state.token = action.payload.token
            localStorage.setItem('user', JSON.stringify(state));
        },
        removeUser:(state,action)=>{
            state.name = null
            state.email = null
            state.token = null
            localStorage.removeItem('user');
        },
        initializeUser: (state) => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              const {name, email, token } = JSON.parse(storedUser);
              state.name = name;
              state.email = email;
              state.token = token;
            }
        }
    }
})

export const {addUser,removeUser,initializeUser} = userSlice.actions;
export default userSlice.reducer; 
