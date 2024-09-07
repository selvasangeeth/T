import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../axios/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const TaskUpdate = () => {
  const { task, index, UserName } = useLocation().state || {};
  const navigate = useNavigate();
  const [tasks, setTasks] = React.useState(task);

  const handleBack = () => {
    navigate("/addtask", { state: { UserName } }); // Navigate back to the home page
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "/updatetask",
        { UserName: UserName, task: tasks, index: index },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast("Task updated successfully");
      setTimeout(() => navigate("/addtask", { state: { UserName } }), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Task: {task}</h1>
      <h2>Task Index: {index}</h2>
      <form onSubmit={handleSubmit}>
        <>
          <input
            type="text"
            placeholder="Update Task"
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
          />
          <button>Update Task</button>
        </>
      </form>
      <button onClick={handleBack}>Add Task</button>
      <ToastContainer />
    </div>
  );
};

export default TaskUpdate;
