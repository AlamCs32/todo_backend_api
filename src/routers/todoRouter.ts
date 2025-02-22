import { Router } from "express";
import * as todoController from "../controllers/todoController"
import * as todoValidation from "../validators/todoValidation"
import reqValidator from "../middlewares/request/reqValidator";
import { authenticateUser } from "../middlewares/request/authenticator";

const router: Router = Router()

router.post("/todo", authenticateUser, reqValidator(todoValidation.createTodo), todoController.createTodo)
router.get("/todo", authenticateUser, reqValidator(todoValidation.getTodo), todoController.getTodo)
router.patch("/todo/:todoId", authenticateUser, todoController.updateStatus)
router.put("/todo/:todoId", authenticateUser, reqValidator(todoValidation.updateTodo), todoController.updateTodo)
router.delete("/todo/:todoId", authenticateUser, todoController.deleteTodo)

export default router