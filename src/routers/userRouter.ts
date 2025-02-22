import { Router } from "express";
import * as userController from "../controllers/userController"
import * as userValidation from "../validators/userValidation"
import reqValidator from "../middlewares/request/reqValidator";

const router: Router = Router()

router.post("/signup", reqValidator(userValidation.singup), userController.singup)
router.post("/login", reqValidator(userValidation.login), userController.login)
router.post("/change-password", userController.changePassword)
router.post("/forget-password", userController.forgetPassword)
router.post("/reset-password", userController.resetPassword)

export default router