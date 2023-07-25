import {Router} from "express";
import {PaymentController} from "../controllers";

const paymentRouter = Router();

paymentRouter.post("/", PaymentController.createPayment);

export default paymentRouter;
