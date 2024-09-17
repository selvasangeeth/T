import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../axios/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Nav from "./Nav";
import Style from "../Styles/TaskUpdate.module.css";

const TaskUpdate = () => {
  const { data, index, UserName } = useLocation().state || {};
  const navigate = useNavigate();
  const formattedDate = data.date ? data.date.slice(0, 10) : "";
  const [tasks, setTasks] = useState(data.inputTasks);
  const [date, setDate] = useState(formattedDate);

  const handleBack = () => {
    navigate("/addtask", { state: { UserName } }); // Navigate back to the home page
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "/updatetask",
        { UserName: UserName, index, data: { tasks, date } },
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
      <div className={Style.background}>
        <Nav />
        <div className={Style.headers}>
          <h1 className={Style.taskdetails}>
            Task :{" "}
            <span className={Style.textfont}>
              {tasks} <span style={{ fontWeight: "bold" }}> Dated :</span>{" "}
              {data.date.slice(0, 10)}
            </span>
          </h1>
          <button className={Style.button} onClick={handleBack}>
            Task Details
          </button>
        </div>
        <div className={Style.content}>
          <form onSubmit={handleSubmit}>
            <>
              <input
                className={Style.textbox}
                type="text"
                placeholder="Update Task"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
              />
              <br />
              <br />
              <input
                type="date"
                className={Style.textbox}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
              <button className={Style.button1}>Update Task</button>
            </>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default TaskUpdate;
