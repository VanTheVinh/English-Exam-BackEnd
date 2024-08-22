import express from "express";
import {
  autoSubmitExam,
  createExam,
  deleteExam,
  getExamById,
  getExamsByClassId,
  submitExam,
  updateExam,
  getExams
} from "../controllers/exam.controller.js";

const examRouter = express.Router();

examRouter.route("/").get(getExams).post(createExam);

examRouter.route("/:id").get(getExamById).put(updateExam).delete(deleteExam);

examRouter.route("/class/:classId").get(getExamsByClassId);

examRouter.route("/submit").post(submitExam);

examRouter.route("/autoSubmit").post(autoSubmitExam);

export default examRouter;
