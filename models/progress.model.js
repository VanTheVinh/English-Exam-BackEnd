import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
    studentId: {                //lưu id của học sinh
        type: String,
        required: true,
        unique: true,
    },
    examId: {                   //lưu id của bài thi
        type: String,
        require: true,
        unique: true,
    },
    answers: {
        type: Array,            //chứa các câu hỏi và câu trả lời của sinh viên
    },
    timeRemaining:{
        type: Number,           // thời gian còn lại
    }
  },  { collection: 'Progress' });

  const progressModel = mongoose.model("progress", ProgressSchema);

  export default progressModel;