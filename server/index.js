var express = require("express");
var app = express();
var cors = require("cors");
const db = require("./db.json");

let session = "";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

function validate(username, password) {
  if (
    db.find(function (val) {
      return val.username === username && val.password === password;
    })
  ) {
    return true;
  }

  return false;
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

app.post("/login", function (req, res) {
  var userData = req.body;
  let isUSer = validate(userData.userName, userData.password);
  if (isUSer) {
    setTimeout(() => {
      return res.json({ userData, validated: isUSer });
    }, 1000);
  } else {
    setTimeout(() => {
      res.statusCode = 401;
      return res.send("None shall pass");
    }, 1000);
  }
});

app.listen("3001", function () {
  console.log("Server listening on port 3001");
});
