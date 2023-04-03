const express = require("express");
const { registerUser, logonUser, logoutUser } = require("../controller/userController");
const { isAuthenticatedUser } = require("../middlewares/Auth");
const Router = express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(logonUser)
Router.route("/logout").get(logoutUser);

module.exports = Router;