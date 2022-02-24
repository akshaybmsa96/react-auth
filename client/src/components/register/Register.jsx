import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { checkLoggedInStatus } from "../../action/checkAndChangeRoute";
import { registerAction } from "../../action/loginAction";
import Loader from "../loader/Loader";
import "./style.css";

export const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const userNameRef = useRef();
  const userPassword = useRef();

  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (checkLoggedInStatus()) {
  //       navigate("/home");
  //     }
  //   }, [navigate]);

  const onRegisterClick = (e) => {
    e.stopPropagation();
    setLoading(true);
    setError(false);
    registerAction({ userName, password })
      .then((res) => {
        setLoading(false);
        res && navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };

  const onKeyChange = (e) => {
    if (e.target === userNameRef.current) {
      setUserName(e.target.value);
    }
    if (e.target === userPassword.current) {
      setPassword(e.target.value);
    }
  };

  return (
    <div>
      <h1 className="heading">Register</h1>
      <section className="loginForm">
        <input
          className="input"
          onChange={onKeyChange}
          type={"text"}
          ref={userNameRef}
          value={userName}
          placeholder={"Username"}
        ></input>
        <input
          className="input"
          onChange={onKeyChange}
          type={"password"}
          ref={userPassword}
          value={password}
          placeholder={"Password"}
        ></input>
        <button className="loginButton" onClick={onRegisterClick}>
          REGISTER
        </button>
        <a href="/login">Login</a>
        {error && <div style={{ color: "red" }}>User Already exists</div>}
      </section>
      {loading && <Loader />}
    </div>
  );
};
