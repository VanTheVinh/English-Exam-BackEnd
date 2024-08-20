// route
import express from "express";
import {
  createResult,
  deleteResult,
  deleteAllResults,
  getAllResults,
  getResultById,
  updateResult,
} from "../controllers/result.controller.js";

const resultRouter = express.Router();

resultRouter
  .route("/delete-all")
  .delete(deleteAllResults);

resultRouter
  .route("/")
  .get(getAllResults)
  .post(createResult);

resultRouter
  .route("/:id")
  .get(getResultById)
  .put(updateResult)
  .delete(deleteResult);

export default resultRouter;
