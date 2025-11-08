import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { logger } from './Utils/logger';
import { authRouter } from './Routes/AuthRoutes';
import { userRouter } from './Routes/UserRoutes';
import cookieParser from 'cookie-parser'



const app=express();
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser())




app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);

export default app;