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

      if(response.data.msg === "LoginSuccess") {
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
      <div className={Style.backgr}>
      <Nav />
      <div className={Style.loginall}>
        <div className={Style.conten}>
        <form onSubmit={handleSubmit}>
          <h2 className={Style.head}>Login</h2>
          <p>UserName</p>
          <input className={Style.textbox}
            type="text"
            placeholder="Enter the Username"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <p>Password</p>
          <input className={Style.textbox}
            type="password"
            placeholder="Enter the Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button className={Style.button}>SUBMIT</button>
          <br />
          <br />
          <Link to="/register" className={Style.register}>Register</Link>
        </form>
        </div>
        <footer>

        </footer>
        <ToastContainer />
      </div>
      </div>
    </div>
  );
};

export default Login;
