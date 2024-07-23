import { NextFunction, Request, Response } from "express";

export default function logger(type: "combined" | "short") {
    if(type === "combined"){
        return (req: Request, res: Response, next: NextFunction) => {
            console.log(`${(new Date().toISOString())} ${req.url} ${req.method} ${req.httpVersion} ${req.get('User-agent')}`);
            next();
        };
    } else {
        return (req: Request, res: Response, next: NextFunction) => {
            console.log(`${(new Date().toDateString())} ${req.url} ${req.method}`);
            next();
        };
    }
}