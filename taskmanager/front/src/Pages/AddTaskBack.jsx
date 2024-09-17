import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "../axios/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Style from "../Styles/AddTask.module.css";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";


//add task
const AddTaskBack = () => {
  const { UserName } = useLocation().state || {};
  const [inputTasks, setInputTasks] = useState("");
  const [date, setDate] = useState("");
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/addtask", {
        UserName: UserName,
        data: { inputTasks, date },
      });
      setInputTasks("");
      setDate("");
      if (response.data.msg == "Task field should not be empty") {
        toast(response.data.msg);
      }
      if (response.data.msg == "Task Added Successfully") {
        toast(response.data.msg);
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // nav to details page
  const handleDetails = () => {
    nav("/addtask", { state: { UserName } });
  };
  return (
    <>
      <div className={Style.background}>
        <Nav />
        <div className={Style.all}>
          <h1 className={Style.head}>Add more do more..!!</h1>
          <form onSubmit={handleSubmit}>
            <input
              className={Style.textbox}
              type="text"
              placeholder="Enter task"
              value={inputTasks}
              onChange={(e) => setInputTasks(e.target.value)}
            />
            <br />
            <input
              type="date"
              className={Style.textbox}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <button className={Style.button} type="submit">
              Add Task
            </button>
            <button
              className={Style.taskDetails}
              type="button"
              onClick={handleDetails}
            >
              Task Details
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default AddTaskBack;
