import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "../axios/axios";
import Nav from "../Pages/Nav"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";


const TaskCompletion = () => {
  const { UserName, task, index } = useLocation().state || {};
  const [tas, setTas] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/taskcompletion", {
          UserName: UserName,
          task: task,
          index: index,
        });
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [index,task]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getcompletedtasks", {
          params: { UserName: UserName },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setTas(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []); 
  const handleDelete = async (task, index) => {
    try {
      const response = await axios.delete("/deletetask2", {
        data: {
          task: task,
          UserName: UserName,
          index: index,
        },
      });
      toast("Task deleted successfully")
      console.log(response.data);
      setTas((prevTasks) => prevTasks.filter((_,i) => i !== index)); // Update state without reload
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div>
        <Nav/>
      <ol>
        {Array.isArray(tas) ? (
          tas.map((task, index) => (
            <li key={index}>
              {task}{" "}
              <button onClick={() => handleDelete(task, index)}>Remove</button>
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ol>
      <ToastContainer/>
    </div>
  );
};

export default TaskCompletion;
