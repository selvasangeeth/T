import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import Style from "../Styles/TaskDetails.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const [inputTasks, setInputTasks] = useState("");
  const { UserName } = useLocation().state || {};

  const nav = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoginSuccess");
    if (!isLoggedIn) {
      nav("/"); // Redirect to login if not logged in
    } else {
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
    }
  }, [UserName]);

  //Add tasks
  const handleAddTask = () => {
    nav("/addtask1", { state: { UserName } });
  };
  // Update task
  const handleUpdate = (data, index, UserName) => {
    nav("/updatetask", { state: { data, index, UserName } });
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
      toast("Task deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  //task completion
  const handleCompleted = async (tasked,index) => {
    const responseDel = await axios.delete("/deletetask", {
      data: {
        UserName: UserName,
        index : index,
      },
    });
    console.log(tasked);
    console.log(UserName);
    // task = String(task); // Send the task as a String
    const responseAdd = await axios.post("/taskcompletion", {
      UserName: UserName,
      task: tasked,
    });
    console.log("dnlndlgndgn",responseAdd.data.msg);
    if (responseAdd.data.msg == "Task completed successfully") {
      toast(responseAdd.data.msg);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleCompletedTask = async () => {
    nav("/taskcompletion", { state: { UserName: UserName } });
  };

  // const handleLogout = async () => {
  //   localStorage.removeItem("isLoginSuccess"); // Clear login state
  //   nav("/");

  // };

  const handleCalender= async () => {
    nav("/calender", { state: { UserName: UserName } });
  };
  return (
    <div>
      <Nav />
      <div className={Style.background}>
        <div className={Style.welcomeContainer}>
          <div className={Style.welcomeText}>
            <h1>Welcome "{UserName}"</h1>
            <p className={Style.greet}>Have a Great day...!</p>
          </div>
          <div className={Style.buttonall}>
          <button className={Style.button} onClick={handleCalender}>
              Calender
            </button>
            <button className={Style.button} onClick={handleCompletedTask}>
              Completed Tasks
            </button>
            <button className={Style.button} onClick={handleAddTask}>
              Add New Task
            </button>
          </div>
        </div>
        <div className={Style.tasks}>
          <ol>
            {tasks.map((task, index) => (
              <li key={index}className={Style.taskItem}>
                <div className={Style.taskD}>
                  <span className={Style.taskName}>
                    {index + 1}
                    {". "}
                    {task.data.inputTasks}
                  </span>
                  <span className={Style.dated}>
                    {"Due on "}
                    {task.data.date.slice(0, 10)}
                  </span>
                </div>
                <div className={Style.buttontaskall}>
                  <button
                    className={Style.buttontask1}
                    onClick={() => handleUpdate(task.data, index, UserName)}
                  >
                    Update
                  </button>{" "}
                  <button
                    className={Style.buttontask2}
                    onClick={() => handleDelete(task, index)}
                  >
                    Delete
                  </button>
                  {"    "}
                  <button
                    className={Style.buttontask3}
                    onClick={() => handleCompleted(task.data.inputTasks,index)}
                  >
                  Completed
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AddTask;
