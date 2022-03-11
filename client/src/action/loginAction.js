const BASE_URL = "http://localhost:3001";
const controller = new AbortController();
const signal = controller.signal;
export const loginAction = ({ userName, password }) => {
  return new Promise((resolve, rej) => {
    fetch(BASE_URL + "/login", {
      method: "POST",
      signal,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        sessionStorage.setItem(
          "loggedInStatus",
          JSON.stringify({ userName, loggedIn: true, jwt: res.token })
        );
        // localStorage.setItem(
        //   "loggedInStatue",
        //   JSON.stringify({ userName, loggedIn: true })
        // );
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        rej("Error");
      });
  });

  //controller.abort();
};

export const registerAction = ({ userName, password }) => {
  return new Promise((resolve, rej) => {
    fetch(BASE_URL + "/register", {
      method: "POST",
      signal,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        sessionStorage.setItem(
          "loggedInStatus",
          JSON.stringify({ userName, loggedIn: true, jwt: res.token })
        );
        // localStorage.setItem(
        //   "loggedInStatus",
        //   JSON.stringify({ userName, loggedIn: true })
        // );
        //createCookie("loggedInStatus", true, 5);
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        rej("Error");
      });
  });
};

export const validateToken = (token) => {
  token = JSON.parse(sessionStorage.getItem("loggedInStatus")).jwt;
  return new Promise((resolve, rej) => {
    fetch(BASE_URL + "/validate", {
      method: "GET",
      signal,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });
};
