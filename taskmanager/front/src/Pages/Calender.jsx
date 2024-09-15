import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import Style from "../Styles/Calender.module.css";

const Calender = () => {
  const localizer = momentLocalizer(moment);
  const [tasks, setTasks] = useState([]);
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

  const myEventsList = tasks.map((t, index) => {
    const taskDate = new Date(t.data.date);
    return {
      title: t.data.inputTasks,
      start: new Date(taskDate.setHours(0, 0, 0, 0)), // Start at 12:00 AM
      end: new Date(taskDate.setHours(23, 59, 59, 999)), // End at 11:59 PM
    };
  });

  const handleDetails = () => {
    nav("/addtask", { state: { UserName } });
  };

  return (
    <div>
      <Nav />
      <div className={Style.tasky}>
        <button
          className={Style.taskDetails}
          type="button"
          onClick={handleDetails}
        >
          Task Details
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh", marginTop: "10px" }}
      />
    </div>
  );
};

export default Calender;
