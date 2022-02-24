const BASE_URL = "http://localhost:3001";
const controller = new AbortController();
const signal = controller.signal;
export const loginAction = ({ userName, password }) => {
  return new Promise((resolve, rej) => {
    fetch(BASE_URL + "/login", {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        sessionStorage.setItem(
          "loggedInStatue",
          JSON.stringify({ userName, loggedIn: true })
        );
        localStorage.setItem(
          "loggedInStatue",
          JSON.stringify({ userName, loggedIn: true })
        );
        createCookie("loggedInStatus", true, 1);
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
          JSON.stringify({ userName, loggedIn: true })
        );
        localStorage.setItem(
          "loggedInStatus",
          JSON.stringify({ userName, loggedIn: true })
        );
        createCookie("loggedInStatus", true, 1);
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        rej("Error");
      });
  });
};

function createCookie(name, value, minutes) {
  let expires = "";
  if (minutes) {
    let date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
