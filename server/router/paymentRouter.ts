import {Router} from "express";
import {PaymentController} from "../controllers";
import {authMiddleware, customerMiddleware} from "../middlewares";

const paymentRouter = Router();

paymentRouter.post(
	"/create-checkout-session",
	authMiddleware,
	customerMiddleware,
	PaymentController.createCheckoutSession
);
paymentRouter.post(
	"/refund/:paymentId",
	authMiddleware,
	customerMiddleware,
	PaymentController.refund
);
paymentRouter.post(
	"/setup",
	authMiddleware,
	customerMiddleware,
	PaymentController.setUp
);

export default paymentRouter;
