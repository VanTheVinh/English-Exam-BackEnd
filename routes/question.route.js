import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestionsByExam,
  updateQuestion,
} from "../controllers/question.controller.js";

const questionRouter = express.Router();

questionRouter.route("/").get(getQuestionsByExam).post(createQuestion);

questionRouter
  .route("/:id")
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);
  
export default questionRouter;