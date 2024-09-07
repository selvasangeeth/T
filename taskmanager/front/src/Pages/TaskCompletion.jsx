import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "../axios/axios";

const TaskCompletion = () => {
  const { UserName, task, index } = useLocation().state || {};
  const [tas, setTas] = useState([]);

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
  }, [UserName]);

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
  }, []); // Correct dependency

  const handleDelete = async (task, index) => {
    try {
      const response = await axios.delete("/deletetask2", {
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
  return (
    <div>
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
    </div>
  );
};

export default TaskCompletion;
