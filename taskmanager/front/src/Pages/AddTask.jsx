import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
import { useLocation } from "react-router-dom";
import Nav from "../Pages/Nav";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [inputTasks, setInputTasks] = useState("");
  const { UserName} = useLocation().state || {};
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/gettasks", {
          params: { UserName: UserName }, // Pass UserName as a query parameter
        });
        const { tasks } = response.data;
        setTasks(tasks || []); // Ensure tasks is an array even if response.data.tasks is undefined
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [UserName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = [inputTasks];
    try {
      const response = await axios.post("/addtask", {
        tasks: newTask,
        UserName: UserName,
      });
      setInputTasks(""); // Clear the input field
      setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the existing tasks
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };


  // Update task
  const handleUpdate = (task, index) => {
    nav("/updatetask", { state: { task, index, UserName } });
    console.log(index);
  };

  // delete task
  const handleDelete = async (task, index) => {
    try {
      const response = await axios.delete("/deletetask", {
        data: {
          task: task,
          UserName: UserName,
          index: index,
        },
      });
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

//task completion
  const handleCompleted =async (task, index) => {
    const response = await axios.delete("/deletetask",  {
      data: {
        task: task,
        UserName: UserName,
        index: index,
      },
  })
   nav("/taskcompletion", {state:{task: task, index: index,UserName: UserName}})
  };
  return (
    <div>
      <Nav />
      <h1>Add Task</h1>
      <h1>Welcome {UserName}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={inputTasks}
          onChange={(e) => setInputTasks(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{" "}
            <button onClick={() => handleUpdate(task, index, UserName)}>
              Update
            </button>{" "}
            <button onClick={() => handleDelete(task, index)}>Delete</button>{"    "}
            <button onClick={()=>handleCompleted(task,index)}>Mark as completed</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default AddTask;
