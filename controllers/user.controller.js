import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { token } from "../utils/token.utils.js";
import dotenv from "dotenv";

dotenv.config();

const userController = {
  createUser: async (req, res) => {
    try {
      const { userId, userName, email, password, confirmPassword,fullName, avatar, role } = req.body;
      if (!userId) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập userId!" });
      }
      if (!userName) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập userName!!" });
      }
      if (!email) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập email!" });
      }
      if (!password) {
        return res.status(400).json({ message: "Vui lòng nhập password!" });
      }
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập confirmPassword!" });
      }


      const existedUserId = await userModel.findOne({ userId });
      if (existedUserId) {
        return res.status(400).json({ message: "tài khoản đã tồn tại!" });
      }
      //tạo chuỗi ngẫu nhiên
      const salt = bcrypt.genSaltSync();
      //thực hiện mã hóa
      const hash = bcrypt.hashSync(password, salt);
      const createdAt = new Date();
      const createdUser = await userModel.create({
        userId,
        userName,
        email,
        password: hash,
        salt,
        fullName,
        avatar,
        role
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
      // Check if user exists
      const crrUser = await userModel.findOne({ userName });
      if (!crrUser) {
        return res
          .status(401)
          .json({ message: "Tài khoản không tồn tại!" });
      }
      // Compare passwords
      const isPasswordValid = bcrypt.compareSync(password, crrUser.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Sai mật khẩu!" });
          
      }
      // Remove sensitive information from user data
      const userResponse = {
        ...crrUser.toObject(),
      };
      delete userResponse.password;
      delete userResponse.salt;
      // Generate tokens
      const tkAt = token.generateToken(
        {
          userName: crrUser.userName,
          _id: crrUser._id,
          tokenType: "AT",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const tkRf = token.generateToken(
        {
          userName: crrUser.userName,
          _id: crrUser._id,
          tokenType: "RT",
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      // Send response
      res.status(200).send({
        data: {
          user: userResponse,
          accessToken: tkAt,
          refreshToken: tkRf,
        },
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  logout: async (req, res) => {
    res.status(200).json({
      message: "Đăng xuất thành công",
    });
  },
  getOneUser: async (req, res) => {
    try {
      const { id } = req.params;
      const crrUser = await userModel.findById(id);
      if (!crrUser) throw new Error("Không tồn tại thông tin người dùng!");
      res.status(200).send({
        data: crrUser,
        message: "Thành công",
      });
    } catch (error) {
      res.status(401).send({
        message: error.message,
      });
    }
  },
};


export default userController;
