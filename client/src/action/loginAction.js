const BASE_URL = "http://localhost:3001";
export const loginAction = ({ userName, password }) => {
  const controller = new AbortController();
  const signal = controller.signal;

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
        // sessionStorage.setItem(
        //   "loggedInStatue",
        //   JSON.stringify({ userName, loggedIn: true })
        // );
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

function createCookie(name, value, minutes) {
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else {
    var expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
