import React, { useState,useEffect, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"


const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);

    const [currState,setCurrState] = useState("Sign Up");
    const [data ,setData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const onChangeHandler = (e)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setData(data=> ({...data,[name]:value}))
    }
    
    const onLogin = async (e) => {
        e.preventDefault();
    
        let newUrl = url;  // Ensure 'url' contains the correct base URL (e.g., 'http://localhost:4000/')
        if (currState === "Login") {
            newUrl += "api/user/login";
        } else {
            newUrl += "api/user/register";
        }
    
        try {
            const response = await axios.post(newUrl, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
                window.location.reload();  // Reloads the page after login
            } else {
                alert(response.data.message || "Invalid userId or password");
            }
        } catch (error) {
            // Log and display error for debugging
            console.error("Login Error:", error);
            if (error.response && error.response.data) {
                alert(error.response.data.message || "An error occurred. Please try again.");
            } else {
                alert("Network error. Please check your connection and try again.");
            }
        }
    };
    

  return (
    <div className='login-popup'>
        
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2> <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Sign Up"?<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' />:<></>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' />
            </div>
            <button type='submit'>{currState==="Login"?"Login":"Create account"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" name="" id="" />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"
                ?<p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
                :<p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>
            }
        </form>
       
    </div>
  )
}

export default LoginPopup
