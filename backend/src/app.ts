import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import errorMiddleware from "./middlewares/errorMidleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/books", bookRoutes);
app.use(errorMiddleware);

export default app;
