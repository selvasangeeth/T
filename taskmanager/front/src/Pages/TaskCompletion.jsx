import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "../axios/axios";
import Nav from "../Pages/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Style from "../Styles/TaskCompletion.module.css";
import { useNavigate } from "react-router-dom";

const TaskCompletion = () => {
  const { UserName } = useLocation().state || {};
  console.log(UserName);
  const [tas, setTas] = useState();
  const nav = useNavigate();

  useEffect((e) => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getcompletedtasks", {
          params: { UserName: UserName },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setTas(response.data);
        console.log(tas);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (index) => {
    try {
      console.log(index);
      const response = await axios.delete("/deletetask2", {
        data: {
          UserName: UserName,
          index: index,
        },
      });
      toast("Task deleted successfully");
      console.log(response.data);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDetails = () => {
    nav("/addtask", { state: { UserName } });
  };

  return (
    <div>
      <Nav />
      <div className={Style.tasks}>
        <div className={Style.tasky}>
          <button
            className={Style.taskDetails}
            type="button"
            onClick={handleDetails}
          >
            Task Details
          </button>
        </div>
        <ol>
          {Array.isArray(tas) && tas.length > 0 ? (
            tas.map((task, index) => (
              <li key={index} className={Style.taskItem}>
                <div className={Style.taskD}>
                  <span className={Style.taskName}>
                    {index + 1}
                    {". "}
                    {task.data.inputTasks}
                  </span>
                  <span className={Style.dated}>
                    {"Completed on "}
                    {task.data.date.slice(0, 10)}
                  </span>
                </div>
                <button
                  className={Style.button}
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>Not Yet Completed any Task !!</p>
          )}
        </ol>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TaskCompletion;
