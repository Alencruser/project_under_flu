import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import errorMiddleware from './middlewares/errorMidleware';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/books', bookRoutes);
app.use(errorMiddleware);

export default app;
