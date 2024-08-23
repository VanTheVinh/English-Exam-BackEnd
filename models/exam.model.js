import mongoose from "mongoose";

const ExamSchema = mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    examCode: {
      type: String,
      required: true,
      default: null,
    },
    examName: {
      type: String,
      required: true,
      default: null,
    },
    duration: {
      type: String,
      required: true,
      default: null,
    },
    questionCount: {
      type: Number,
      required: true,
      default: 10,
    },
    status: {
      type: String,
      required: true,
      default: "incompleted",
      //"incompleted",
      //"completed",
    },
  },
  { collection: "Exams" }
);

const examModel = mongoose.model("Exam", ExamSchema);

export default examModel;
