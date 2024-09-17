import Style from "../Styles/Nav.module.css";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";

const Nav = () => {
  const nav = useNavigate();
  const log = localStorage.getItem("isLoginSuccess");
  const handlelogout = async () => {
    const  response = await axios.get("/logout",{withCredentials: true});
    console.log(response);
    localStorage.removeItem("isLoginSuccess");
    nav("/");
  };
  return (
    <>
      <div className={Style.navall}>
        <div className={Style.header}>
          <h2 className={Style.name}>Taskly</h2>
        </div>
        {log && (
          <div className={Style.logout}>
            <button onClick={handlelogout} className={Style.button}>
              LogOut
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Nav;
