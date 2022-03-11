export const checkLoggedInStatus = () => {
  if (getCookie("loggedInToken")) {
    return true;
  } else {
    return false;
  }
};

export const logoutAction = () => {
  var mydate = new Date();
  mydate.setTime(mydate.getTime() - 1);
  document.cookie = "loggedInToken=; expires=" + mydate.toGMTString();
};

const getCookie = (cname) => {
  let name = cname + "=";
  console.log(document.cookie);
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
