import mongoose from "mongoose";
import studentModel from "../models/student.model.js";
import resultModel from "../models/result.model.js";
import examModel from "../models/exam.model.js";
import questionModel from "../models/question.model.js";
//crud exam 
const calculateScore = async (examId, answers) => {
  //VD:
  //answers = [
    //   {
    //     questionId: "question1_id",
    //     answer: "Answer A"
    //   },
    //   {
    //     questionId: "question2_id",
    //     answer: "Answer B"
    //   },
    // ];
  const questions = await questionModel.find({ examId });
  
  let correctAnswers = 0;

  questions.forEach(question => {
    const studentAnswer = answers.find(answer => answer.questionId === question.id);
    if (studentAnswer && question.questionAnswers.some(q => q.isCorrect && q.answerText === studentAnswer.answer)) {
      correctAnswers++;
    }
  });

  const score = (correctAnswers / questions.length) * 100;
  return score;
};

export const submitExam = async (req, res) => {
  try {
    const { studentId, examId, answers } = req.body;
    
    const exam = await examModel.findById( examId );

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    if (exam.status === "completed") {
      return res.status(403).json({ message: "This exam has already been completed and cannot be submitted again." });
    }
    if(exam){
      const resultExist= await resultModel.findOne( {studentId} );
      if(resultExist){
        return res.status(403).json({ message: "Already submitted." });
      }
    }
    const score = await calculateScore(examId, answers);

    const result = new resultModel({
      studentId,
      examId,
      score,
      dateTaken: new Date(),
      submitted: true,
    });

    await result.save();

    return res.status(200).json({ message: "Exam submitted successfully.", score });
  } catch (error) {
    console.error("Error during exam submission:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const autoSubmitExam = async (examId) => {
  try {
    const exam = await examModel.findOne({ examId });

    if (!exam) {
      throw new Error("Exam not found");
    }

    if (exam.status === "completed") {
      return;
    }

    const students = await studentModel.find({
      _id: { $nin: await resultModel.find({ examId }).distinct('studentId') }
    });

    for (const student of students) {
      const score = await calculateScore(examId, student.answers);

      const result = new resultModel({
        resultId: mongoose.Types.ObjectId().toString(),
        studentId: student.studentId,
        examId,
        score,
        dateTaken: new Date(),
        submitted: true,
      });

      await result.save();

      
    }
    exam.status = "completed";
    await exam.save();
  } catch (error) {
    console.error("Error during automatic exam submission:", error);
  }
};

export const createExam = async (req, res) => {
  try {
    const { classId, examCode, examName, duration, questionCount } = req.body;

    const Exam = await examModel.findOne({ examCode });

    if (Exam) {
      return res.status(404).json({ message: "Exam existed!" });
    }

    const newExam = new examModel({
      classId,
      examCode,
      examName,
      duration,
      questionCount,
      status: "incompleted",
    });

    await newExam.save();

    return res.status(201).json({
      message: "Exam created successfully",
      exam: newExam,
    });
  } catch (error) {
    console.error("Error creating exam:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getExams= async (req, res) => {
  try {
    const exam = await examModel.find();

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    return res.status(200).json({ exam });
  } catch (error) {
    console.error("Error retrieving exam:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await examModel.findById( id );

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    return res.status(200).json({ exam });
  } catch (error) {
    console.error("Error retrieving exam:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { examId, classId, examCode, examName, duration, questionCount, status } = req.body;

    const updatedExam = await examModel.findByIdAndUpdate(
       id ,
      { examId, classId, examCode, examName, duration, questionCount, status },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    return res.status(200).json({
      message: "Exam updated successfully",
      exam: updatedExam,
    });
  } catch (error) {
    console.error("Error updating exam:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExam = await examModel.findByIdAndDelete(id);

    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    return res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
