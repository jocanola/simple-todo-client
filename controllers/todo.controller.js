const Todo = require("../models/todo");
const { validationResult } = require("express-validator");
module.exports.addTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const todo = req.body;
    console.log("Testing Todo", todo);
    const data = new Todo(req.body);
    await data.save();
    return res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getTodos = async (req, res) => {
  const isComplete = req.query.complete;
  try {
    const data = await Todo.find({ complete: isComplete });
    res.status(200).json({ message: "Get all todos", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Todo.findByIdAndUpdate(
      id,
      { complete: true },
      { new: true }
    );
    res.status(200).json({ message: "Get all todos", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
