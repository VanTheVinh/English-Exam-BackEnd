import mongoose from "mongoose";

const TeacherSchema = mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacherCode: {
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
  { collection: "Teachers" }
);

const teacherModel = mongoose.model("Teacher", TeacherSchema);

export default teacherModel;
