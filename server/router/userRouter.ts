import {Router} from "express";
import {UserController} from "../controllers";
import {authMiddleware, customerMiddleware} from "../middlewares";

const userRouter = Router();

userRouter.get(
	"/payments",
	authMiddleware,
	customerMiddleware,
	UserController.getPayments
);
userRouter.get(
	"/subscriptions",
	authMiddleware,
	customerMiddleware,
	UserController.getSubscriptions
);

export default userRouter;
