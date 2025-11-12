import { Router } from "express";
import { UserController } from "../Controller/userController";
import { AuthController } from "../Controller/AuthController";
import { authRouter } from "./AuthRoutes";
import { verifyToken } from "../Middleware/Verify";

const router=Router();

router.get('/all',verifyToken,UserController.getAllUsers);
router.post('/changeAmount',verifyToken,UserController.changeAmountInWallet);
router.get('/getUser',UserController.getNormalUser)
router.put('/updateUser',UserController.UpdateUser);
router.get('/getHistory',verifyToken,UserController.getHistory);

export const userRouter=router;