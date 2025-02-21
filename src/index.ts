import express from "express"
import { PORT } from "./utils/constants"
import errorHandler from "./middlewares/response/errorHandler";
import allRoutes from "./routers/index"

const app = express()

// Allow all Routes
app.use("/", allRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`== Server running on Port ${PORT} ==`);
})