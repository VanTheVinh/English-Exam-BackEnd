import mongoose from "mongoose";
import examModel from "../models/exam.model.js";
import questionModel from "../models/question.model.js";
import { autoSubmitExam } from "../controllers/exam.controller.js";
//crud questions
export const createQuestion = async (req, res) => {
  try {
    const { examId, questionText, difficulty, questionAnswers } = req.body;

    if (questionAnswers.length !== 4 && questionAnswers.length !== 2) {
      return res
        .status(400)
        .json({ message: "There must be two or four answers." });
    }

    const correctAnswersCount = questionAnswers.filter(
      (answer) => answer.isCorrect
    ).length;
    if (correctAnswersCount !== 1) {
      return res
        .status(400)
        .json({ message: "There must be exactly one correct answer." });
    }

    const question = await questionModel.findOne({ questionText });

    if (question) {
      return res.status(404).json({ message: "Question existed!" });
    }

    const newQuestion = new questionModel({
      examId,
      questionText,
      difficulty,
      questionAnswers,
    });

    await newQuestion.save();

    return res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getQuestionsByExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await examModel.findById( examId );

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const questions = await questionModel.find({ examId });

    if (questions.length == exam.questionCount) {
    //   setTimeout(async () => {
    //     await autoSubmitExam(examId);
    //   }, exam.duration);
      return res.status(200).json({ questions });
    }

    if (questions.length !== exam.questionCount) {
      return res.status(400).json({
        message: `Expected ${exam.questionCount} questions but found ${questions.length}`,
        questions,
      });
    }

    return res.status(200).json({ questions });
  } catch (error) {
    console.error("Error retrieving questions:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await questionModel.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ question });
  } catch (error) {
    console.error("Error retrieving question:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getQuestions = async (req, res) => {
  try {

    const question = await questionModel.find();

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ question });
  } catch (error) {
    console.error("Error retrieving question:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { examId, questionText, difficulty, questionAnswers } = req.body;

    if (
      questionAnswers &&
      questionAnswers.length !== 4 &&
      questionAnswers.length !== 2
    ) {
      return res
        .status(400)
        .json({ message: "There must be two or four answers." });
    }

    if (questionAnswers) {
      const correctAnswersCount = questionAnswers.filter(
        (answer) => answer.isCorrect
      ).length;
      if (correctAnswersCount !== 1) {
        return res
          .status(400)
          .json({ message: "There must be exactly one correct answer." });
      }
    }

    const updatedQuestion = await questionModel.findByIdAndUpdate(
      id,
      { examId, questionText, difficulty, questionAnswers },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    console.error("Error updating question:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await questionModel.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
