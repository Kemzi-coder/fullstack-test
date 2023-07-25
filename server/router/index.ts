import {Router} from "express";
import authRouter from "./authRouter";
import paymentRouter from "./paymentRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/payment", paymentRouter)

export default router;
