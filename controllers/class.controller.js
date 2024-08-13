import classModel from "../models/class.model.js";

export const createClass = async (req, res) => {
  try {
    const { classCode, className } = req.body;

    const Class = await classModel.findOne({ classCode });

    if (Class) {
      return res.status(404).json({ message: "Class existed!" });
    }
    const newClass = new classModel({
      classCode,
      className,
    });

    await newClass.save();

    return res.status(201).json({
      message: "Class created successfully",
      class: newClass,
    });
  } catch (error) {
    console.error("Error creating class:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await classModel.find();

    if (classes.length === 0) {
      return res.status(404).json({ message: "No classes found" });
    }

    return res.status(200).json({ classes });
  } catch (error) {
    console.error("Error retrieving classes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    const classItem = await classModel.findById(id);

    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({ class: classItem });
  } catch (error) {
    console.error("Error retrieving class:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { classCode, className } = req.body;

    const updatedClass = await classModel.findByIdAndUpdate(
      id,
      { classCode, className },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({
      message: "Class updated successfully",
      class: updatedClass,
    });
  } catch (error) {
    console.error("Error updating class:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClass = await classModel.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
