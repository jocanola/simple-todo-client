const express = require("express");
const { body } = require("express-validator");
const todoController = require("../controllers/todo.controller");
const router = express.Router();

router.post("/todo", body("todo").isLength({ min: 5 }), todoController.addTodo);
router.get("/todo", todoController.getTodos);
router.put("/todo/:id", todoController.updateTodo);
router.delete("/todo/:id", todoController.deleteTodo);

module.exports = router;
