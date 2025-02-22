import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"
import { PORT } from "./utils/constants"
import errorHandler from "./middlewares/response/errorHandler";
import allRoutes from "./routers/index"

const app: Application = express()

app.use(express.json({ limit: '500mb' })); // JSON payload
app.use(express.urlencoded({ limit: '500mb', extended: true })); // URL-encoded payload

// Allow cors
app.use(cors({
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}))

// Allow all Routes
app.use("/", allRoutes);

// Log http requests
app.use(morgan("dev"));

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`== Server running on Port ${PORT} ==`);
})