import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: null,
  },
  fullName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: null,
  }
}, { collection: 'Users' });

const userModel = mongoose.model("user", UserSchema);

export default userModel;
