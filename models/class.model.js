import mongoose from "mongoose";

const ClassSchema = mongoose.Schema(
  {
    classCode: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
      default: null,
    },
  },
  { collection: "Classes" }
);

const classModel = mongoose.model("Class", ClassSchema);

export default classModel;
