import express from "express";
import {
  createResult,
  deleteResult,
  getAllResults,
  getResultById,
  updateResult
} from "../controllers/result.controller.js";

const resultRouter = express.Router();

resultRouter.route("/").get(getAllResults).post(createResult);

resultRouter
  .route("/:id")
  .get(getResultById)
  .put(updateResult)
  .delete(deleteResult);

export default resultRouter;
