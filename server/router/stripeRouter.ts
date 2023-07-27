import {Router} from "express";
import {StripeController} from "../controllers";

const stripeRouter = Router();

stripeRouter.post("/webhook", StripeController.webhook);

export default stripeRouter;