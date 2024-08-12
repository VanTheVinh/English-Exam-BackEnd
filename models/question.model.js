import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
  },
  questionText: {
    type: String,
    required: true,
    default: null,
  },
  difficulty: {
    type: String,
    required: true,
    default: "easy",
    //"medium","hard"
  },
  questionAnswers: [
    {
      answerText: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
        default: false,
      }
    }
  ]
}, { collection: 'Questions' });

const questionModel = mongoose.model("Question", QuestionSchema);

export default questionModel;
