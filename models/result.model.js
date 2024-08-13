import mongoose from "mongoose";

const ResultSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    dateTaken: {
      type: Date,
      required: true,
    },
    submitted: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "Results" }
);

const resultModel = mongoose.model("Result", ResultSchema);

export default resultModel;
