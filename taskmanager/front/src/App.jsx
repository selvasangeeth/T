import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Nav from "./Pages/Nav"
import Register from "./Pages/Register";
import Home from "./Pages/Home"
import TaskDetails from "./Pages/TaskDetails";
import Updatetask from "./Pages/TaskUpdate"
import TaskCompletion from "./Pages/TaskCompletion"
import AddTaskBack from "./Pages/AddTaskBack";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path ="/nav" element={<Nav/>}/>
          <Route path ="/home" element={<Home/>}/>
          <Route path ="/addtask" element={<TaskDetails />}/> 
          <Route path ="/updatetask" element={<Updatetask/>}/>
          <Route path ="/taskcompletion" element={<TaskCompletion/>}/>
          <Route path ="/addtask1" element = {<AddTaskBack/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
