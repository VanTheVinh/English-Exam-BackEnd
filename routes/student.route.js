import express from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/student.controller.js";

const studentRouter = express.Router();

studentRouter.route("/").get(getAllStudents).post(createStudent);

studentRouter
  .route("/:id")
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

export default studentRouter;
