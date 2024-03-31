import React, { useRef, useState } from 'react'
import Header from './Header'
import ValidateInput from './../utils/InputValidation.js'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';

function Login() {

    const email= useRef(null)
    const password= useRef(null)
    const name= useRef(null)
    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const [isSignIn , setIsSignIn] = useState(true);
    const [error,setError] = useState(null)

    function toogleSignIn(){
        setIsSignIn(!isSignIn)
    }

    async function SubmitForm(){
        let isError;
        if(isSignIn)
            isError=ValidateInput("",email.current.value,password.current.value,true)
        else
            isError=ValidateInput(name.current.value,email.current.value,password.current.value,false)
      
        setError(isError)
        if(!isError){
            if(isSignIn){
                axios.post("http://localhost:3000/signin",{
                    email:email.current.value,
                    password:password.current.value,
                    isSignin:true   
                }).then((response)=>{
                    console.log("name of user is => ",response.data.name)
                    console.log("token is => ",response.data.token)

                    dispatch(addUser({
                        name:response.data.name,
                        email:response.data.email,
                        token:response.data.token
                    }))
                    navigate("/browse");
                }).catch((error)=>{
                    console.log(error)
                    setError(error.response.data.message)
                })
            }else{
                axios.post("http://localhost:3000/signin",{
                    name:name.current.value,
                    email:email.current.value,
                    password:password.current.value,
                    isSignin:false
                }).then((response)=>{
                    console.log("name of user is => ",response.data.name)
                    console.log("token is => ",response.data.token)
                    dispatch(addUser({
                        name:response.data.name,
                        email:response.data.email,
                        token:response.data.token
                    }))
                    navigate("/browse");
                }).catch((error)=>{
                    console.log(error)
                    setError(error.response.data.message)
                })
            }   
        }
    }

  return (
    <div className=' relative'>
        <Header/>
        <div className={` absolute bg-cover bg-center w-[100vw] h-[100vh] bg-[url("https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_medium.jpg")]`}>
        </div>
        <div className=' w-[100vw] h-[100vh] bg-black opacity-60 absolute'>
        </div>
        <div className='w-[88vw] md:w-[500px] absolute top-[10vh] md:top-80 xl:top-36   left-1/2 -translate-x-1/2 flex flex-col gap-6 bg-black  text-white bg-opacity-65 z-10 p-4 md:p-10 md:px-16 rounded-md md:pb-24' >
           
            <header>
                <h1 className='text-3xl md:text-4xl font-bold tracking-wide text-white'>{isSignIn?"Sign In":"Sign Up"}</h1>
            </header>
           
            <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col gap-6' action="">
                {!isSignIn && <input ref={name} className=' bg-black bg-opacity-25 outline-none px-3  py-2 md:py-4 text-lg border-white border-solid border-2 border-opacity-50 rounded-md' type="text" placeholder='Full Name' />}
                <input ref={email} className=' bg-black bg-opacity-25 outline-none px-3 py-2 md:py-4 text-lg border-white border-solid border-2 border-opacity-50 rounded-md' type="text" placeholder='Email or phone number' />
                <input ref={password} className=' bg-black bg-opacity-25  text-white outline-none  px-3 py-2 md:py-4 border-white border-solid border-2 border-opacity-50 rounded-md' type="password" placeholder='Password' />
                {error&& <p className=' text-red-600'>{error}</p>}
                <button onClick={SubmitForm} className='bg-[#E50914] p-2 text-lg rounded-md mt-3' > {isSignIn?"Sign In":"Sign Up"}</button>
            </form>
            <footer className='flex flex-col gap-3'>
                <div className=''>
                    <input className=' rounded-md cursor-pointer text-xl scale-125 bg-black' type="checkbox" id='rememberMe' name='remember'/>
                    <label className=' text-white cursor-pointer' htmlFor='rememberMe'>&nbsp;Remember me</label>
                </div>
                <div className='text-white flex '>
                    <h4 className='  opacity-70'>{isSignIn?"New to Netflix?":"Already a User ?"}  &nbsp;</h4>
                    <h4 className=' cursor-pointer font-medium' onClick={toogleSignIn}>{isSignIn?"Sign Up Now":"Sign In Now"}</h4>
                </div>
                <div className=' text-sm  text-slate-300 opacity-75'>
                    <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. &nbsp; <span className='text-blue-600 opacity-100'>Learn More</span> </p>
                </div>
            </footer> 

        </div>
        
    </div>
  )
}

export default Login