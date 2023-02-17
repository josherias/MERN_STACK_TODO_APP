const Joi = require("joi");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  phone: {
    type: String,
    default: "000000000",
  },
  photo: {
    type: String,
    default: "",
  },
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  const options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  return schema.validate(user, options);
}

function validateUserOnEdit(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email(),
  });

  const options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  return schema.validate(user, options);
}

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name },
    process.env.JWT_PRIVATE_KEY
  );
};

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validateUser = validateUser;
exports.validateUserOnEdit = validateUserOnEdit;
