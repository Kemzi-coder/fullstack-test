import Stripe from "stripe";
import {loadEnvConfig} from "@next/env";
loadEnvConfig("./", process.env.NODE_ENV !== "production");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2022-11-15"
});

export default stripe;
