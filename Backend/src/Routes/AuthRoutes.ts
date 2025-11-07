import {AuthController} from "../Controller/AuthController"
import { Router } from "express"

const router=Router();

router.post('/SignUp',AuthController.SignUP);
router.post('/Login',AuthController.Login);

export const authRouter=router;