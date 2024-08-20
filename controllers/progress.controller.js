import progressModel from require("../models/progress.model.js");

// Lưu tiến trình
exports.saveProgress = async (req, res) => {
  const { studentId, examId, answers, timeRemaining } = req.body;

  try {
    let progress = await progressModel.findOne({ studentId, examId });

    if (progress) {
      progress.answers = answers;
      progress.timeRemaining = timeRemaining;
    } else {
      progress = new progressModel({ studentId, examId, answers, timeRemaining });
    }

    await progress.save();
    res.status(200).json({ message: 'Tiến trình đã được lưu thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi', error: err.message });
  }
};

// Lấy tiến trình
exports.getProgress = async (req, res) => {
  const { studentId, examId } = req.params;

  try {
    const progress = await progressModel.findOne({ studentId, examId });

    if (progress) {
      res.status(200).json(progress);
    } else {
      res.status(404).json({ message: 'Không tìm thấy tiến trình' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Lỗi', error: err.message });
  }
};
