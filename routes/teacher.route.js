import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
} from "../controllers/teacher.controller.js";

const teacherRouter = express.Router();

teacherRouter.route("/").get(getAllTeachers).post(createTeacher);

teacherRouter
  .route("/:id")
  .get(getTeacherById)
  .put(updateTeacher)
  .delete(deleteTeacher);

export default teacherRouter;
