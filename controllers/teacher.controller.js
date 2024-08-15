import teacherModel from "../models/teacher.model.js";

export const createTeacher = async (req, res) => {
  try {
    const { teacherId, teacherCode, classId } = req.body;

    const teacher = await teacherModel.findOne({ teacherId });

    if (teacher) {
      return res.status(404).json({ message: "Teacher existed!" });
    }
    const newTeacher = new teacherModel({
      teacherId,
      teacherCode,
      classId,
    });

    await newTeacher.save();

    return res.status(201).json({
      message: "Teacher created successfully",
      teacher: newTeacher,
    });
  } catch (error) {
    console.error("Error creating teacher:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllTeachers = async (req, res) => {
    try {
      const teachers = await teacherModel.find().populate('teacherId');
  
      if (teachers.length === 0) {
        return res.status(404).json({ message: "No teachers found" });
      }
  
      return res.status(200).json({ teachers });
    } catch (error) {
      console.error("Error retrieving teachers:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await teacherModel.findById(id).populate('teacherId');

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(200).json({ teacher });
  } catch (error) {
    console.error("Error retrieving teacher:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { teacherId, teacherCode, classId } = req.body;

    const updatedTeacher = await teacherModel.findByIdAndUpdate(
      id,
      { teacherId, teacherCode, classId },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(200).json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error("Error updating teacher:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeacher = await teacherModel.findByIdAndDelete( id );

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
