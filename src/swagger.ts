import "dotenv/config";
import swaggerAutogen from "swagger-autogen";
import path from "path";
import fs from "fs";
import { NODE_ENV, SWAGGER_BASE_PATH, SWAGGER_HOST } from "./utils/constants";

const doc = {
  info: {
    title: "Todo App Backend API",
    description: "API Documentation for Todo App",
  },
  servers: [
    {
      url: NODE_ENV === "dev"
        ? `http://${SWAGGER_HOST}${SWAGGER_BASE_PATH}`
        : `https://${SWAGGER_HOST}${SWAGGER_BASE_PATH}`,
      description: "API server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
    },
  },
};

const outputFile = path.resolve(__dirname, "./swagger-output.json");
const endpointsFiles = ["./routers/index.ts"];

if (!fs.existsSync(outputFile)) {
  fs.writeFileSync(outputFile, JSON.stringify({}, null, 2));
}

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
  process.exit();
});;
