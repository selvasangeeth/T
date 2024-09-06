import React from 'react'
import Nav from './Nav'
import { useState } from 'react';
import axios from "../axios/axios";
const Register = () => {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
        const response = await axios.post
        ("http://localhost:8000/register",
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
        const data = response.data;
        console.log(data);   
 }
        catch(error){
            console.log(error);
        }
    }


  return (
    <div>
        <Nav/>
        <form onSubmit={handleSubmit}>
        <h1>Register Page</h1>
        <p>Enter the UserName</p>
        <input type='text'
        placeholder='UserName'
        value={UserName}
        onChange={(e)=>setUserName(e.target.value)}
        />
        <p>Enter the Password</p>
        <input type='password'
        placeholder='Password'
        value = {Password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <br />
        <br/>
        <button>Submit</button>
        </form>
        
    </div>
  )
}

export default Register;