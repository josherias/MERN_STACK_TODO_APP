const express = require("express");
const { validateTodo, Todo } = require("../models/todo");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).exec();
  res.status(200).send(todos);
});

router.get("/:id", auth, async (req, res) => {
  const todo = await Todo.findById(req.params.id).exec();
  if (!todo) return res.status(404).send("Todo with given id was not found");

  const authorised = checkAuthorisedUser(todo.user, req.user._id);
  if (!authorised)
    return res.status(403).send("Your not authorised to view this resource");

  res.status(200).send(todo);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, content } = req.body;

  const todo = await Todo.create({
    user: req.user._id,
    title: title,
    content: content,
  });

  res.status(201).send(todo);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = await Todo.findById(req.params.id).exec();
  if (!todo) return res.status(404).send("Todo with given id was not found");

  const authorised = checkAuthorisedUser(todo.user, req.user._id);
  if (!authorised)
    return res.status(403).send("Your not authorised to edit this resource");

  todo.set({
    title: req.body.title,
    content: req.body.content,
  });

  todo = await todo.save();

  res.status(200).send(todo);
});

router.patch("/:id", auth, async (req, res) => {
  let todo = await Todo.findById(req.params.id).exec();
  if (!todo) return res.status(404).send("Todo with given id was not found");

  const authorised = checkAuthorisedUser(todo.user, req.user._id);
  if (!authorised)
    return res.status(403).send("Your not authorised to edit this resource");

  todo.set({
    completed: true,
  });

  todo = await todo.save();
  res.status(200).send(todo);
});

router.delete("/:id", auth, async (req, res) => {
  let todo = await Todo.findById(req.params.id).exec();
  if (!todo) return res.status(404).send("Todo with given id was not found");

  const authorised = checkAuthorisedUser(todo.user, req.user._id);
  if (!authorised)
    return res.status(403).send("Your not authorised to edit this resource");

  await Todo.findByIdAndRemove(todo.id);

  res.status(204).send("");
});

function checkAuthorisedUser(owner, userInrequest) {
  return owner.toString() == userInrequest;
}

module.exports = router;
