var express = require("express");
var app = express();
var cors = require("cors");
const db = require("./db");
const encyption = require("bcrypt");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

async function validate(username, password) {
  let userExists = db.find(function (val) {
    return val.username === username;
  });
  if (userExists) {
    const match = await encyption.compare(password, userExists.password);
    if (match) return true;

    return false;
  }

  return false;
}

function checkUserExistance(username) {
  if (
    db.find(function (val) {
      return val.username === username;
    })
  ) {
    return true;
  }

  return false;
}

async function storeUSer(username, password) {
  const pass = await encyption.hash(password, 10);
  console.log(pass);
  db.push({ username: username, password: pass });
}

app.use(cors(corsOptions));

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET /api/users
app.get("/", function (req, res) {
  session = req.session;
  return res.send("Working fine");
});

app.post("/login", async function (req, res) {
  var userData = req.body;
  let isUSer = await validate(userData.userName, userData.password);
  if (isUSer) {
    setTimeout(() => {
      return res.json({ userData, validated: isUSer });
    }, 5000);
  } else {
    setTimeout(() => {
      res.statusCode = 401;
      return res.send("User doesn't exists");
    }, 5000);
  }
});

app.post("/register", function (req, res) {
  var userData = req.body;
  if (checkUserExistance(userData.userName)) {
    setTimeout(() => {
      res.statusCode = 401;
      return res.send("User Already exists");
    }, 5000);
  } else {
    storeUSer(userData.userName, userData.password).then(() => {
      setTimeout(() => {
        return res.json({ userData, created: true });
      }, 5000);
    });
  }
});

app.listen("3001", function () {
  console.log("Server listening on port 3001");
});
