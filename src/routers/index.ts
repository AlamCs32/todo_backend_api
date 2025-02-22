import { Router } from "express"
import userRoutes from "./userRouter"
import todoRoutes from "./todoRouter"

const appRoutes: Router = Router()

appRoutes.use("/", userRoutes)
appRoutes.use("/", todoRoutes)

export default appRoutes