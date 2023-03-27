const express = require("express");
const { registerUser, logonUser } = require("../controller/userController");
const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(logonUser)

module.exports = Router;