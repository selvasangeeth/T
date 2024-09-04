import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Nav from "./Pages/Nav"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path ="/nav" element={<Nav/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
