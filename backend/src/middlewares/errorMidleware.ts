import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Error: ", err);

    res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
    });
};

export default errorMiddleware;
