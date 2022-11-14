const express = require("express");
const userRoute = express.Router();
const {
  login,
  register,
  updateUser,
  confirmAccount,
  getDistributorRequest,
  getDistributorList,
} = require("../controller/user");
const { trusted, producer } = require("../services/middleware");

userRoute.get("/distributor-request", producer, getDistributorRequest);

userRoute.get("/distributor-list", producer, getDistributorList);

userRoute.post("/login", login);

userRoute.post("/reg", register);

userRoute.put("/update", trusted, updateUser);

userRoute.put("/confirm/:id", producer, confirmAccount);

module.exports = userRoute;
