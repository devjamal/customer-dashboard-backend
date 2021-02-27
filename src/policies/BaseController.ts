"use strict";
import { Request, Response, NextFunction as Next } from "express";
import jwt = require("jsonwebtoken");
import log4js = require("log4js");
import _ = require("lodash");

export default class BaseController {
  protected log: log4js.Logger;
  protected _: _.LoDashStatic;
  constructor() {
    this._ = _;
    this.log = log4js.getLogger(this.constructor.name);
  }

  protected joiOptions = {
    errors: {
        wrap: {
            label: "",
        },
    },
    stripUnknown: true,
    abortEarly: false,
};

  /**
   * @param  {Request} restify http request
   * @returns User object.
   * (description) Gets the user from the restify request object by decoding the token.
   */
  protected getUser(req: Request) {
    let user;

    let token: any = req.headers["at"] || req.params.token;

    if (!token && req.body && req.body.token) {
      token = req.body.token; // check in req body
    }

    // decode token
    if (token) {
      user = jwt.decode(token);
    }

    return user;
  }

  /**
   * @param  {any} error object
   * @param  {Request} restify http request
   * @param  {Response} restify http response
   * @param  {Next} restify next handler
   * (description) sends the error response.
   */
  protected ErrorResult = (error: any, req: Request, res: Response, next: Next) => {
    let finalMessage: string;
    if (error.errors !== undefined && error.errors.length > 0) {
      error.errors.map((x) => this.log.error(x));
    }
    if (typeof error === "string") {
      finalMessage = error;
    } else {
      finalMessage = error.name + " " + error.message;
    }
    const response = {
      success: false,
      message: finalMessage,
    };

    this.log.error(finalMessage);
    res.status(400);
    res.send(response);
    return next();
  };
}
