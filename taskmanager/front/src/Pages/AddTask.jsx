import React from "react";
import { useState } from "react";
import axios from "../axios/axios";
import { useLocation } from "react-router-dom";

const AddTask = () => {
  const [tasks, setTasks] = useState("");
  const [inputtasks, setInputtasks] = useState("");
  const { UserName } = useLocation().state || {};

  const newtask = [inputtasks];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/addtask", {
        tasks: newtask,
        UserName: UserName,
      });
      setTasks(newtask);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <>
        <h1>Add Task</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter task"
            value={inputtasks}
            onChange={(e) => setInputtasks(e.target.value)}
          />
          <button>Add Task</button>
        </form>
      </>
    </div>
  );
};

export default AddTask;
