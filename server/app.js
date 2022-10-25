const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const userRoute = require("./routes/route");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.listen(process.env.PORT || 3000);
console.log("Server running");
app.use("/user", userRoute);
