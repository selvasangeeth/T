import { useState, useEffect } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/check-auth", {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        if (error.response && error.response.status === 401) {
                 console.log("ERROR OCCURRED ")
        } else {
          console.error("An error occurred:", error.message);
        }
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated };
};

export default useAuth;
