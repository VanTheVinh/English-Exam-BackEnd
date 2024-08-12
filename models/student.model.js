import mongoose from "mongoose";

const StudentSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentCode: {
      type: String,
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      default: null,
    },
  },
  { collection: "Students" }
);

const studentModel = mongoose.model("Student", StudentSchema);

export default studentModel;
