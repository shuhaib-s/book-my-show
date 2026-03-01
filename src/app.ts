import express from "express";
import { env } from "./config/env";
import cors from "cors";
import usersRouter from "./application/routes/users.route";
import globalErrorHandler from "./infrastructure/http/middlewares/globalError.middleware";
import { connectDB, disconnectDB } from "./infrastructure/db/pool";
import { Server } from "node:http";
import theaterRouter from "./application/routes/theater.route";
import screenRouter from "./application/routes/screen.route";
import showRouter from "./application/routes/show.route";
import swaggerDocs from "./swagger";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/theaters", theaterRouter);
app.use("/api/screens", screenRouter);
app.use("/api/shows", showRouter);
app.use(globalErrorHandler);
let server:Server;


const shutdown = async (signal: string) => {
    console.log(`\nReceived ${signal}. Shutting down...`);

    server.close(async () => {
      console.log("HTTP server closed");

      try {
        await disconnectDB(); // close all DB connections
        process.exit(0);
      } catch (err) {
        console.error("error in shutting down the server", err);
        process.exit(1);
      }
    });
  };

async function serverStart() {
    await connectDB();
     import("./application/listners/index");
     server = app.listen(env.port, () => {
      console.log(`Server running on ${env.port}`);
    });
    swaggerDocs(app);
  
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  
    // crash safety
    process.on("uncaughtException", shutdown);
    process.on("unhandledRejection", shutdown);
  }


export default serverStart;