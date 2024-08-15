import studentModel from "../models/student.model.js";
//crud studentgit checkout -b EEWEB-111-implement-add-edit-delete-student-functionality
export const createStudent = async (req, res) => {
  try {
    const { studentId, studentCode, classId } = req.body;

    const student = await studentModel.findOne({ studentId });

    if (student) {
      return res.status(404).json({ message: "Student existed!" });
    }
    const newStudent = new studentModel({
      studentId,
      studentCode,
      classId,
    });

    await newStudent.save();

    return res.status(201).json({
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllStudents = async (req, res) => {
    try {
      const students = await studentModel.find().populate('studentId');
  
      if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
      }
  
      return res.status(200).json({ students });
    } catch (error) {
      console.error("Error retrieving students:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
//profile
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await studentModel.findById(id).populate('studentId');

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ student });
  } catch (error) {
    console.error("Error retrieving student:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, studentCode, classId } = req.body;

    const updatedStudent = await studentModel.findByIdAndUpdate(
      id,
      { studentId, studentCode, classId },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await studentModel.findByIdAndDelete( id );

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
