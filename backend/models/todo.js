const Joi = require("joi");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: {
      type: String,
      required: true,
      minlenth: 5,
      maxlength: 100,
    },

    content: {
      type: String,
      required: true,
      minlenth: 5,
    },

    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    content: Joi.string().min(5).required(),
  });

  const options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  return schema.validate(todo, options);
}

const Todo = mongoose.model("Todo", todoSchema);

exports.validateTodo = validateTodo;
exports.Todo = Todo;
