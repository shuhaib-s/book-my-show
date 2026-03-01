import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

export type Req = Request & { user?: any | JwtPayload, isAdmin?: boolean };
export type Res = Response;
export type Next = NextFunction;
export type Error = Error & { isOperational?: boolean };