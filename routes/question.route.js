import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestionsByExam,
  updateQuestion,
  getQuestions,
} from "../controllers/question.controller.js";

const questionRouter = express.Router();

questionRouter.route("/").get(getQuestions).post(createQuestion);

questionRouter
  .route("/:id")
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

questionRouter.route("/exam/:examId").get(getQuestionsByExam);
export default questionRouter;
