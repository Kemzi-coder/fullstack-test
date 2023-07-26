import {Router} from "express";
import {PaymentController} from "../controllers";
import {authMiddleware} from "../middlewares";

const paymentRouter = Router();

paymentRouter.post(
	"/checkout-session",
	authMiddleware,
	PaymentController.createCheckoutSession
);
paymentRouter.post("/setup", authMiddleware, PaymentController.setUp);

export default paymentRouter;
