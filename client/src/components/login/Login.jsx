import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoggedInStatus } from "../../action/checkAndChangeRoute";
import { loginAction } from "../../action/loginAction";
import "./style.css";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const userNameRef = useRef();
  const userPassword = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (checkLoggedInStatus()) {
      navigate("/home");
    }
  }, [navigate]);

  const onLoginClick = (e) => {
    e.stopPropagation();
    loginAction({ userName, password })
      .then((res) => {
        res && navigate("/home");
      })
      .catch((err) => {
        console.log(err);
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
      <h1 className="heading">Login</h1>
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
        <button className="loginButton" onClick={onLoginClick}>
          Login
        </button>
      </section>
    </div>
  );
};
