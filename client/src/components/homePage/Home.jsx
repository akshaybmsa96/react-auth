import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoggedInStatus } from "../../action/checkAndChangeRoute";
import "./style.css";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkLoggedInStatus()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Hello this is a home component</h1>
      <h2>Welcome to the Photo Gallary</h2>

      <div>
        <img
          className="image"
          loading="lazy"
          alt="high-def-img"
          src="https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ></img>
      </div>
    </div>
  );
};
