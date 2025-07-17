import type { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Like } from "typeorm";

// Retrieve id from response
export function retrieveIdFromPath(req: Request) {
    const id = Number.parseInt(req.params.id!);
    if (!Number.isNaN(id))
        return id;
    return 0;
}

// Parse to number
export function parseToNumber(value: any) {
    const id = Number.parseInt(value);
    if (!Number.isNaN(id))
        return id;
    return 0;
}

// Not found response
export function notFoundResponse(res: Response, msg = 'NOT_FOUND') {
    res.status(404).json({
        message: msg,
        timestamp: new Date()
    });
}

// Error response
export function sendErrorResponse(res: Response, code = 400, msg = "BAD_REQUEST") {
    res.status(code).json({
        message: msg,
        timestamp: new Date()
    });
}

// Error response
export function sendError(res: Response, e: any) {
    res.status(500).json({
        message: e.message,
        timestamp: new Date()
    });
}

// Validate if defined
export function checkIfDefined(data: any, res: Response) {
    if (data == undefined) {
        notFoundResponse(res)
        return;
    }
    return data;
}

// Search utils
export function filter(search: string) {
    const filter = search ?? "";
    return Like(`%${filter}%`)
}

// Search utils
export function splitFilter(search: string) {
    const filter = search ?? "";
    return filter.trim().split(/\s+/).map(part => Like(`%${part}%`));
}

// Make number 0 if its undefined or empty string
export function fixNumber(value: any) {
    if (value == undefined) return 0
    if (value == '') return 0
    return Number(value)
}

// Auth
dotenv.config();
export function authenticateToken(req: Request, res: Response, next: Function) {
    const publicPaths = [
        '/api/user/login', '/api/user/refresh',
        '/api/result/subject/permalink', '/api/subject/permalink'
    ];

    if (publicPaths.some(path => req.path.startsWith(path))) {
        next();
        return;
    }

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return sendErrorResponse(res, 401, 'NO_TOKEN_FOUND')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            return sendErrorResponse(res, 403, 'INVALID_TOKEN')
        }

        //@ts-ignore
        req.user = user.name
        next()
    })
}