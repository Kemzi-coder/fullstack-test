import {Router} from "express";
import {AuthController} from "../controllers";
import {authMiddleware} from "../middlewares";

const authRouter = Router();

authRouter.post("/signup", AuthController.signUp);
authRouter.post("/signin", AuthController.signIn);
authRouter.post("/refresh", AuthController.refresh);
authRouter.post("/signout", authMiddleware, AuthController.signOut);

export default authRouter;
