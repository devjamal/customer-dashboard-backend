import jwt = require("jsonwebtoken");
import { Request, Response, NextFunction as Next } from "express";
import _ = require("lodash");
import { logger } from "./InitApp";

export function IsAuthenticated(req: Request, res: Response, next: Next): any {
  const token: string = (req.headers["at"] || req.params.at) as string;
  try {
    // check header or url parameters or post parameters for token

    // if (!token && req.body && req.body.token) {
    //   token = req.body.token; // check in req body
    // }

    // decode token
    if (!_.isNil(token)) {
      // verifies secret and checks exp
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
          if (err.message && err.message === "jwt expired") {
            return res.json({ success: false, message: "Token expired." });
          }

          return res.json({ success: false, message: "Failed to authenticate token." });
        } else {
          // if everything is good, save to request for use in other routes
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      res.status(403);
      return res.send({
        success: false,
        message: "No token provided.",
      });
    }
  } catch (error) {
    logger.error("IsAuthenticate", error, token);
    res.status(403);
    return res.send({
      success: false,
      message: "No token provided.",
    });
  }
}
