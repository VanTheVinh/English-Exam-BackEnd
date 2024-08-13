import express from "express";
import userController from "../controllers/user.controller.js";
import middlewares from "../middlewares/user.middleware.js";
import { validateLoginRequest } from "../middlewares/auth.middleware.js";
const userRouter = express.Router();

userRouter
    .route("/")
    .post(userController.createUser, middlewares.verifyJwt());

userRouter
    .route("/:id")
    .get(middlewares.verifyJwt(), userController.getOneUser)
    .put(userController.updateUser, middlewares.verifyJwt())
    .delete(userController.deleteUser, middlewares.verifyJwt());

userRouter.post("/login", validateLoginRequest, userController.login);
userRouter.post("/logout", userController.logout);

export default userRouter;
