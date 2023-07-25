import {Request} from "express";
import {UserDto} from "./lib/dtos";

type CustomRequest = Request & {user?: UserDto};

export type {CustomRequest};
