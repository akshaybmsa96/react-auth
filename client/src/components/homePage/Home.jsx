import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkLoggedInStatus,
  logoutAction,
} from "../../action/checkAndChangeRoute";
import { validateToken } from "../../action/loginAction";
import "./style.css";

export const Home = () => {
  const navigate = useNavigate();

  const validate = () => {
    validateToken()
      .then((res) => {
        console.log("hmmm validated", res);
      })
      .catch((err) => {
        console.log("s0rry boss", err);
        logoutAction();
        navigate("/login");
      });
  };

  useEffect(() => {
    if (!checkLoggedInStatus()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <a className="logout" href="/login" onClick={logoutAction}>
        logout
      </a>
      <h1>Welcome to the Photo Gallary</h1>

      <div>
        <img
          className="image"
          loading="lazy"
          alt="high-def-img"
          src="https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ></img>
      </div>

      <button onClick={validate}>VALIDATE ME PLEASE</button>
    </div>
  );
};
