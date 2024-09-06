import React from 'react'
import {Link} from "react-router-dom"
import Nav from "./Nav"
const Home = () => {
  return (
    <div>
      <Nav />
      <Link to = "/addtask">Add Task</Link>
      <h3>View Completed Task</h3>
    </div>
  )
}

export default Home