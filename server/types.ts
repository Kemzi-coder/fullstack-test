import {Request} from "express";
import {UserDto} from "./lib/dtos";

type CustomRequest = Request & {user?: UserDto; customerId?: string};

export type {CustomRequest};
