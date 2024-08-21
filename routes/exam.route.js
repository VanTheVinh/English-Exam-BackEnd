import express from "express";
import {
  autoSubmitExam,
  createExam,
  deleteExam,
  getExamById,
  submitExam,
  updateExam,
  getExams
} from "../controllers/exam.controller.js";

const examRouter = express.Router();

examRouter.route("/").get(getExams).post(createExam);

examRouter.route("/:id").get(getExamById).put(updateExam).delete(deleteExam);

examRouter.route("/submit").post(submitExam);

examRouter.route("/autoSubmit").post(autoSubmitExam);

export default examRouter;
