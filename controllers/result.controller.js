// result.controller.js
import mongoose from "mongoose";
import resultModel from "../models/result.model.js";

export const createResult = async (req, res) => {
  try {
    const { studentId, examId, score, submitted } = req.body;
    const dateTaken = new Date();

    const existingResult = await resultModel.findOne({ studentId, examId });
    if (existingResult) {
      return
    }

    const newResult = new resultModel({
      studentId,
      examId,
      score,
      dateTaken, 
      submitted,
    });

    await newResult.save();

    return res.status(201).json({
      message: "Result created successfully",
      result: newResult,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllResults = async (req, res) => {
  try {
    const results = await resultModel.find();

    if (results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    return res.status(200).json({ results });
  } catch (error) {
    console.error("Error retrieving results:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getResultById = async (req, res) => {
  try {
    const { resultId } = req.params;

    const result = await resultModel.findOne({ resultId });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error retrieving result:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { resultId } = req.params;
    const { studentId, examId, score, dateTaken, submitted } = req.body;

    const updatedResult = await resultModel.findOneAndUpdate(
      { resultId },
      { studentId, examId, score, dateTaken, submitted },
      { new: true }
    );

    if (!updatedResult) {
      return res.status(404).json({ message: "Result not found" });
    }

    return res.status(200).json({
      message: "Result updated successfully",
      result: updatedResult,
    });
  } catch (error) {
    console.error("Error updating result:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { resultId } = req.params;

    const deletedResult = await resultModel.findOneAndDelete({ resultId });

    if (!deletedResult) {
      return res.status(404).json({ message: "Result not found" });
    }

    return res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    console.error("Error deleting result:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAllResults = async (req, res) => {
  try {
    // Xóa tất cả các kết quả
    const result = await resultModel.deleteMany({});

    // Kiểm tra nếu không có kết quả nào bị xóa
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No results found to delete" });
    }

    return res.status(200).json({ message: "All results deleted successfully" });
  } catch (error) {
    console.error("Error deleting results:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

