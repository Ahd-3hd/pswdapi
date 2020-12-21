const express = require("express");
const UserController = require("../controllers/user.controllers");
const userRouter = express.Router();

userRouter.post("/signup", UserController.signup);
userRouter.get("/signin", UserController.signin);

module.exports = userRouter;
