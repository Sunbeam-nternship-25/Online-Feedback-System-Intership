const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("./config");
const utils = require("./utils");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Server is running"));


app.use((request, response, next) => {
  if (request.url == "/teacher/login" || request.url == "/teacher/register") {
    next();
  } else {
    let token = request.headers["authorization"];
    if (!token) {
      response.send(utils.createError("token is missing"));
      return;
    }

    token = token.replace("Bearer", "").trim();

    try {
      if (jwt.verify(token, config.secret)) {
        const payload = jwt.decode(token);
        request["userInfo"] = payload;
        next();
      } else {
        response.send(utils.createError("Invalid token"));
      }
    } catch (ex) {
      response.send(utils.createError("Invalid token"));
    }
  }
});



const teacherRouter = require("./router/teacher");
const feedbackRouter = require("./router/feedback")
const questionRouter= require("./router/question")


app.use("/teacher", teacherRouter);
app.use("/feedback", feedbackRouter);
app.use("/question" , questionRouter)




app.listen(4004, "0.0.0.0", () => {
  console.log("server is running on port 4004");
});
