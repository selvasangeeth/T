import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Nav from "./Pages/Nav"
import Register from "./Pages/Register";
import Home from "./Pages/Home"
import AddTask from "./Pages/AddTask";
import Updatetask from "./Pages/TaskUpdate"
import TaskCompletion from "./Pages/TaskCompletion"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path ="/nav" element={<Nav/>}/>
          <Route path ="/home" element={<Home/>}/>
          <Route path ="/addtask" element={<AddTask />}/> 
          <Route path ="/updatetask" element={<Updatetask/>}/>
          <Route path ="/taskcompletion" element={<TaskCompletion/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
