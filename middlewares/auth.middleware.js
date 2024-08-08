import Joi from "joi";
import { getErrorMessages } from "../utils/validation.util.js";

// Middleware to validate login request

export const validateLoginRequest = async (req, res, next) => {
  const schema = Joi.object({
    userName: Joi.string()
      .required()
      .messages({ "any.required": "userName is missing" }),
    password: Joi.string()
      .required()
      .messages({ "any.required": "password is missing" }),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: getErrorMessages(error) });
  }
};
