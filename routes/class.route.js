import express from "express";
import {
  createClass,
  deleteClass,
  getAllClasses,
  getClassById,
  updateClass,
} from "../controllers/class.controller.js";

const classRouter = express.Router();

classRouter.route("/").get(getAllClasses).post(createClass);

classRouter
  .route("/:id")
  .get(getClassById)
  .put(updateClass)
  .delete(deleteClass);

export default classRouter;
