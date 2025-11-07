import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { logger } from './Utils/logger';
import { authRouter } from './Routes/AuthRoutes';



const app=express();
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));



app.use('/api/auth',authRouter)

export default app;