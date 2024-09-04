import React, { useState } from "react";
import Nav from "./Nav"
import Style from "../Styles/Login.module.css";
import axios from "axios";
const Login = () => {
  const[UserName,setUserName] = useState("");
  const[Password,setPassword] = useState("");

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try{
          console.log(UserName,Password)
          const response = await axios.post("http://localhost:8000/",{UserName:UserName,Password:Password},{
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response.data); // Print the received data from the server.
    }
    catch(err){
      console.error(err)
    }
  }
  
  return (
    <div>
       <Nav/>
      <div className={Style.loginall}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>UserName</p>
        <input type="text"
         placeholder="Enter the Username"
         value={UserName}
         onChange={(e) => setUserName(e.target.value)}
         />
        <br/>
        <p>Password</p>
       <input type="password"
        placeholder="Enter the Password"
        value={Password}
        onChange = {(e)=>setPassword(e.target.value)}/>
       <br/>
       <button>SUBMIT</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
