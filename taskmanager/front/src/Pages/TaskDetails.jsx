import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import Style from "../Styles/TaskDetails.module.css";

const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const [inputTasks, setInputTasks] = useState("");
  const { UserName } = useLocation().state || {};
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/gettasks", {
          params: { UserName: UserName }, // Pass UserName as a query parameter
        });
        const { tasks } = response.data;
        setTasks(tasks || []); 
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [UserName]);

  //Add tasks
  const handleAddTask = () => {
    nav("/addtask1", { state: { UserName } });
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
  const handleCompleted = async (task, index) => {
    const response = await axios.delete("/deletetask", {
      data: {
        task: task,
        UserName: UserName,
        index: index,
      },
    });
    task = String(task); // Send the task as a String
    nav("/taskcompletion", {
      state: { task: task, index: index, UserName: UserName },
    });
  };
  return (
    <div>
      <div className={Style.background}>
      <Nav />
      <div className={Style.welcomeuser}>
      <h1>Welcome "{UserName}"<p className={Style.greet}>Have a Great day...!</p></h1>
      <button className={Style.button} onClick={handleAddTask}>Add New Task</button>
      </div>
      <div className={Style.tasks}>
      <ol >
        {tasks.map((task, index) => (
          <li key={index} className={Style.taskItem }>{index+1}{". "}
            {task}{" "}
            <div className={Style.buttontaskall}> 
            <button className={Style.buttontask1} onClick={() => handleUpdate(task, index, UserName)}>
              Update
            </button>{" "}
            <button className={Style.buttontask2}  onClick={() => handleDelete(task, index)}>Delete</button>
            {"    "}
            <button className={Style.buttontask3} onClick={() => handleCompleted(task, index)}>
              Mark as completed
            </button>
            </div>
          </li>
        ))}
      </ol>
      </div>
    </div>
    </div>
  );
};

export default AddTask;
