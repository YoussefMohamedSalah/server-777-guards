import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

export const sanitizeRequestBody = (req: Request, res: Response, next: NextFunction) => {
  // Sanitize request body fields
  if (req.body) {
    for (let key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = sanitizeHtml(req.body[key]);
      }
    }
  }
  next();
};
