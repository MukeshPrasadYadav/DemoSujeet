import {AuthController} from "../Controller/AuthController"
import { Router } from "express"

const router=Router();

router.post('/SignUp',AuthController.SignUP);
router.post('/Login',AuthController.Login);
router.post('/logout',AuthController.Logout)
router.get('/verify',AuthController.VerifyMe);

export const authRouter=router;