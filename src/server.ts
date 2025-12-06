import express, { Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: false }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
})

export default app;