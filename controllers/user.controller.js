import userModel from "../models/user.model.js";
import studentModel from "../models/student.model.js";
import teacherModel from "../models/teacher.model.js";
import bcrypt from "bcrypt";
import { token } from "../utils/token.utils.js";
import dotenv from "dotenv";

dotenv.config();

const userController = {
  createUser: async (req, res) => {
    try {
      const { userName, email, password, confirmPassword, fullName, avatar, role } = req.body;
      
      if (!userName) {
        return res.status(400).json({ message: "Vui lòng nhập userName!" });
      }
      if (!email) {
        return res.status(400).json({ message: "Vui lòng nhập email!" });
      }
      if (!password) {
        return res.status(400).json({ message: "Vui lòng nhập password!" });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Mật khẩu và xác nhận mật khẩu không khớp!" });
      }

      const existingUser = await userModel.findOne({ userName });
      if (existingUser) {
        return res.status(400).json({ message: "Tài khoản đã tồn tại!" });
      }

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);

      const createdUser = await userModel.create({
        userName,
        email,
        password: hashedPassword,
        fullName,
        avatar,
        role,
      });
      
      res.status(201).json({
        data: createdUser,
        message: "Tạo tài khoản thành công",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { userName, password } = req.body;

      const currentUser = await userModel.findOne({ userName });
      if (!currentUser) {
        return res.status(401).json({ message: "Tài khoản không tồn tại!" });
      }

      const isPasswordValid = bcrypt.compareSync(password, currentUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Sai mật khẩu!" });
      }

      const userResponse = currentUser.toObject();
      delete userResponse.password;

      const accessToken = token.generateToken(
        {
          userName: currentUser.userName,
          _id: currentUser._id,
          tokenType: "AT",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const refreshToken = token.generateToken(
        {
          userName: currentUser.userName,
          _id: currentUser._id,
          tokenType: "RT",
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.status(200).json({
        data: {
          user: userResponse,
          accessToken,
          refreshToken,
        },
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    res.status(200).json({ message: "Đăng xuất thành công" });
  },

  getOneUser: async (req, res) => {
    try {
      const { id } = req.params;
      const currentUser = await userModel.findById(id);
      if (!currentUser) {
        return res.status(404).json({ message: "Không tồn tại thông tin người dùng!" });
      }
      res.status(200).json({
        data: currentUser,
        message: "Thành công",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { userName, email, password, fullName, avatar, role } = req.body;

      const updateData = {};
      if (userName) updateData.userName = userName;
      if (email) updateData.email = email;
      if (password) {
        const salt = bcrypt.genSaltSync();
        updateData.password = bcrypt.hashSync(password, salt);
      }
      if (fullName) updateData.fullName = fullName;
      if (avatar) updateData.avatar = avatar;
      if (role) updateData.role = role;

      const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: "Người dùng không tồn tại!" });
      }

      res.status(200).json({
        data: updatedUser,
        message: "Cập nhật người dùng thành công",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedUser = await userModel.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: "Người dùng không tồn tại!" });
      }

      res.status(200).json({ message: "Xóa người dùng thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default userController;
