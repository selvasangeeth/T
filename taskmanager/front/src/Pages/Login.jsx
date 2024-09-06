import React, { useState } from "react";
import Nav from "./Nav";
import Style from "../Styles/Login.module.css";
import axios from "../axios/axios"
import { useNavigate } from "react-router-dom";
import {Link }from "react-router-dom"
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      console.log(UserName, Password);
      const response = await axios.post(
        "/login",
        { UserName: UserName, Password: Password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(response.data.msg=== "LoginSuccess") {
        nav("/addtask",{state:{UserName}});
      } else {  
       toast(response.data.msg);
    } 
  }catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Nav />
      <div className={Style.loginall}>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p>UserName</p>
          <input
            type="text"
            placeholder="Enter the Username"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter the Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>SUBMIT</button>
          <br />
          <br />
          <Link to="/register">Register</Link>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
