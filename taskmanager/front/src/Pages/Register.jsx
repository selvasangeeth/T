import React from 'react'
import Nav from './Nav'
import { useState } from 'react';
import axios from "../axios/axios";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import Style from "../Styles/Register.module.css"
import { Link } from 'react-router-dom';
const Register = () => {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
        const response = await axios.post
        ("/register",
            {
                UserName: UserName,
                Password: Password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        toast(response.data.msg);
        const data = response.data;
        console.log(data);   
        setUserName('');
        setPassword('');
 }
        catch(error){
            console.log(error);
        }
    }


  return (
    <div>
        <div className={Style.backgr}>
        <Nav/>
        <div className={Style.registerall}>
        <div className={Style.conten}>
        <form onSubmit={handleSubmit}>
        <h1 className={Style.head}>Register</h1>
        <p>UserName</p>
        <input className={Style.textbox}
        type='text'
        placeholder='UserName'
        value={UserName}
        onChange={(e)=>setUserName(e.target.value)}
        />
        <p>Password</p>
        <input className={Style.textbox}
        type='password'
        placeholder='Password'
        value = {Password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <br />
        <br/>
        <button className={Style.button}>Submit</button>
        <br/>
        <Link to="/" className={Style.login}>Login</Link>
        </form>
        <ToastContainer/>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Register;